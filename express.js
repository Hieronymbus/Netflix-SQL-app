import express from "express";
import pkg from "pg";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';


dotenv.config();
const __dirname = path.resolve();

const { Client } = pkg;
const app = express();
const port = process.env.PORT || 3000;

const userID = 1;

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

//HardCoded user id
let userId;

function authMiddleware(req, res, next) {
  const authenticationHeader = req.header("authentication");

  if(!authenticationHeader || !authenticationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Invalid authorization header" });
  };

  const token = authenticationHeader.replace("Bearer ", "");
  userId = token;
  console.log('authMiddleware called and returning: ', token);

  next();
};

app.get('/authenticate', authMiddleware, async (req, res) => {
  const data = req.header("authentication");
  console.log(data);
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

app.post('/favourites', async(req, res) => {
  const data = req.body;
  console.log(await data);
  await client.query(`CREATE TABLE IF NOT EXISTS favourites (
                      netflix_shows_id VARCHAR(100) NOT NULL,
                      user_id VARCHAR(100) NOT NULL
                      )`
  );

  if(!userId) {
    res.status(401);
    return;
  };

  await client.query(`INSERT INTO favourites (netflix_shows_id, user_id)
                     VALUES ('${data.show_id}', '${userId}')`
  );

  const usersFavourites = await client.query(`SELECT * FROM favourites WHERE user_id = '${userId}'`);
  console.log(usersFavourites.rows);
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
