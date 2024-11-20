import express from "express";
import pkg from "pg";
import path from "path"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const __dirname = path.resolve()

const { Client } = pkg;
const app = express();
const port = process.env.PORT || 3000;

const userID = 1;

app.use(cors());


// let clientConfig ;
// // if (process.env.NODE_ENV === "production") {
  //     clientConfig = {
    //       connectionString: process.env.POSTGRES_URI
    //     }
    
    //   clientConfig = {
      //     user: "myuser",
      //     host: "localhost",
      //     database: "netflix",
      //     password: "mypassword",
      //     port: 5432,
      //
      
      const client = new Client({
        connectionString: process.env.POSTGRES_URI
      });

      client
      .connect()
      .then(() => console.log("Connected to PostgreSQL database"))
      .catch((err) => console.error("Connection error ", err.stack));
      
      app.get("/", async (req, res) => {
        try {
          const itemCount = parseInt(req.query.itemCount) || 12;
          const result = await client.query(`SELECT * FROM netflix_shows LIMIT $1`, [itemCount]);
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
        
        try {
          const filters = [];
          const values = [];
          
          if (releaseYear) {
            filters.push(`release_year BETWEEN $${filters.length + 1} AND $${filters.length + 2}`);
            values.push(releaseYear, releaseDecade);
          };
          if (duration) {
      filters.push(`duration = $${filters.length + 1}`);
      values.push(duration);
    };
    if (rating) {
      filters.push(`rating = $${filters.length + 1}`);
      values.push(rating);
    };
    
    const resultQuery = filters.length ? `WHERE ${filters.join(" AND ")}` : '';
    
    const query = `
    SELECT * FROM netflix_shows
    ${resultQuery}
    ORDER BY release_year
    LIMIT $${values.length + 1}
    `;
    
    values.push(itemCount);
    
    console.log('Executing Query:', query);
    console.log('With values:', values);
    
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
    const result = await client.query(`SELECT * FROM netflix_shows WHERE title ILIKE '%${searchFor}%'  LIMIT $1 `, [itemCount]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

app.get('/oneMovieDetails', async(req, res) => {
  
  const{movieTitle} = req.query
  
  try {
    const result = await client.query(`SELECT * FROM netflix_shows WHERE title = $1 LIMIT 1` , [movieTitle])
    res.json(result.rows)
  } catch (error) {
    console.error(err);
    res.status(500).send('server error');
  }
  
})
// Check if the app is running in "production" mode
// "process.env.NODE_ENV" is an environment variable that stores the current mode (development or production)
if (process.env.NODE_ENV === "production") {

  // Serve static files from the "dist" folder inside the "frontend" directory
  // In production, the frontend files (HTML, CSS, JavaScript, etc.) are often bundled and placed in a "dist" folder
  app.use(express.static(path.join(__dirname, "/dist")));

  // Handle all other routes by sending the "index.html" file
  // The "*" means that any route that doesn't match an API or static file will be handled by this
  app.get("*", (request, response) => {
      // Send the "index.html" file located in the "dist" folder
      // This ensures that the frontend's main HTML file is served for any route (like React or Vue's client-side routing)
      response.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on localhost:${port}`));
