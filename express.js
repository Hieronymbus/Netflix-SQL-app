import express from "express";
import pkg from "pg";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = 'secretKey';

dotenv.config();
const __dirname = path.resolve();

const { Client } = pkg;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
//Recieve data from req.header/body
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
  // Serve static files from the "dist" folder inside the "frontend" directory
  // In production, the frontend files (HTML, CSS, JavaScript, etc.) are often bundled and placed in a "dist" folder
  app.use(express.static(path.join(__dirname, "/dist")));
}

let clientConfig;

if (process.env.NODE_ENV === "production") {
  clientConfig = {
    connectionString: process.env.POSTGRES_URI,
  }
} else {
  clientConfig = {
    user: "myuser",
    host: "localhost",
    database: "netflix",
    password: "mypassword",
    port: 5432,
  }
}

const client = new Client(clientConfig);

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error ", err.stack));

function authMiddleware(req, res, next) {
  const authenticationHeader = req.header("authentication");

  if(!authenticationHeader || !authenticationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Invalid authorization header" });
  };

  const token = authenticationHeader.replace("Bearer ", "");

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    //user arg = serialized user object?
    if(err) return res.status(403);
    req.user = user;
  });
  next();
};

//Test authentication
app.post('/authenticate', authMiddleware, async(req, res) => {
  const token = req.header("authentication");
  res.status(201).send({ data: token });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    res.status(404).json({ message: 'Missing data' });
    return;
  };

  try {
    const result = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);
    const user = result.rows[0];
    const userData = {
      userId: user.user_id,
      username: user.username
    };

    const match = await bcrypt.compare(password, user.password);
    
    if(!match) {
      console.error('Passwords do not match');
      res.status(404).json({ message: 'Incorrect password' });
      return;
    };

    const token = jwt.sign(userData, SECRET_KEY);
    res.status(201).json({ message: `Logged in as: ${username}`, user: userData, token: token });
  } catch(err) {
    console.error(err.stack);
  };
});

app.post('/register', async(req, res) => {
  const { username, password, confirmPassword, email } = req.body;

  if(!password || password !== confirmPassword) {
    res.status(404).json({ message: 'Error with password' });
    return;
  };

  try {
    await client.query(`CREATE TABLE IF NOT EXISTS users 
      (user_id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
      )`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);

    if(existingUser.rows[0]) {
      console.log("Username already exists: ", existingUser.rows[0].username);
      res.status(404).json({ message: 'Username already exists' });
      return;
    };
  
    await client.query(`INSERT INTO users
      (username, password, email)
      VALUES
      ($1, $2, $3)
    `, [username, hashedPassword, email]);

    res.status(201).send({ message: `Created user ${username}`});
  } catch(err) {
    console.error(err.stack);
  };


});
  
app.get("/allMovies", async (req, res) => {
  try {
    const itemCount = parseInt(req.query.itemCount) || 12;
    const result = await client.query(`SELECT * FROM netflix_shows LIMIT $1`, [
      itemCount,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

app.get("/filter", async (req, res) => {
  const itemCount = parseInt(req.query.itemCount) || 12;
  const releaseYear = parseInt(req.query.releaseYear) || null;
  const duration = req.query.duration || null;
  const rating = req.query.rating || null;
  const releaseDecade = releaseYear ? releaseYear + 10 : null;
  const searchValue = req.query.searchValue ;

  try {
    const filters = [];
    const values = [];

    if (releaseYear) {
      filters.push(`(release_year BETWEEN $${filters.length + 1}`);
      filters.push(`$${filters.length + 1})`);
      values.push(releaseYear, releaseDecade);
    }
    if (duration) {
      filters.push(`duration = $${filters.length + 1}`);
      values.push(duration);
    }
    if (rating) {
      filters.push(`rating = $${filters.length + 1}`);
      values.push(rating);
    }
    if (searchValue) {
      filters.push(`title ILIKE '%${searchValue}%'`)
    }

    const resultQuery = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    const query = `
    SELECT * FROM netflix_shows
    ${resultQuery}
    ORDER BY release_year
    LIMIT $${values.length + 1}`;

    values.push(itemCount);

    console.log("Executing Query:", query);
    console.log("With values:", values);

    const result = await client.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server error");
  }
});

app.get("/search", async (req, res) => {
  const { searchFor, itemCount } = req.query;

  try {
    const result = await client.query(
      `SELECT * FROM netflix_shows WHERE title ILIKE '%${searchFor}%'  LIMIT $1 `,
      [itemCount]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

app.get("/oneMovieDetails", async (req, res) => {
  const { movieTitle } = req.query;

  try {
    const result = await client.query(
      `SELECT * FROM netflix_shows WHERE title = $1 LIMIT 1`,
      [movieTitle]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("server error");
  }
});

app.post('/add-favourites', authMiddleware, async(req, res) => {
  try {
    const data = await req.body;
    await client.query(`CREATE TABLE IF NOT EXISTS favourites (
                        netflix_shows_id VARCHAR(100) NOT NULL,
                        user_id VARCHAR(100) NOT NULL
                        )`
    );
  
    const user = await client.query(`SELECT * FROM users WHERE username = '${data.username}'`);
    const userId = await user.rows[0].user_id;
    const existingFavourite = await client.query(`SELECT * FROM favourites WHERE netflix_shows_id = '${data.movieId}' AND user_id = '${userId}'`);

    if(existingFavourite.rows.length > 0) return res.status(401).json({ message: "Show is already in favourites" });
    
    await client.query(`INSERT INTO favourites (netflix_shows_id, user_id)
                       VALUES ('${data.movieId}', '${userId}')`
    );
  
    const usersFavourites = await client.query(`SELECT * FROM favourites WHERE user_id = '${userId}'`);
    console.log(usersFavourites.rows[0]);
    res.status(201).json({ message: `Added movie with id ${data.movieId} to favourites` });
  } catch(err) {
    console.error('ERROR!: ', err);
  };
});

app.get('/get-favourites/:userId', async(req, res) => {
  const userId = `'${req.params.userId}'`;
  try{
    const favMovies = await client.query(`SELECT netflix_shows_id FROM favourites WHERE user_id = ${userId}`);
    const arr = favMovies.rows; 
    const favMovieIds = arr.map(obj => `'${obj.netflix_shows_id}'`);
    let whereClauseValues = favMovieIds.join(", ");
    const favouriteMovieDetails = await client.query(`SELECT * FROM netflix_shows WHERE show_id IN (${whereClauseValues})`);
    res.status(201).json(favouriteMovieDetails.rows);
  } catch(err) {
    console.error("get favourites error: ", err);
  };
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
