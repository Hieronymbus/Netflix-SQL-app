import express from "express";
import pkg from "pg";
import cors from "cors";

const { Client } = pkg;
const app = express();
const port = 3000;

app.use(cors());

const client = new Client({
  user: "myuser",
  host: "localhost",
  database: "netflix",
  password: "mypassword",
  port: 5432,
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
  const releaseDecade = releaseYear + 10;
  console.log(releaseYear);

  try {

    //Use the CASE clause
    const filters = [];
    if(duration && !releaseYear && !rating) {
      filters.push("(duration = $3)");
    } else if(releaseYear) {
      filters.push("(release_year BETWEEN $1");
      filters.push("$2)");
    } else if(rating) {
      filters.push("(rating = $4)");
    }
    filters.join("AND");

    console.log(filters);

    const result = await client.query(`SELECT * FROM netflix_shows 
                                      WHERE
                                      ${filters}
                                      ORDER BY release_year ASC LIMIT $5`, [releaseYear, releaseDecade, duration, rating, itemCount]);
    console.log("Filter year endpoint");
    res.json(result.rows);
  } catch (err) {
    console.error("server error");
    res.status(500).send("server error");
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

app.listen(port, () => console.log(`Listening on localhost:${port}`));
