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
  const releaseYear = parseInt(req.query.releaseYear);
  const duration = req.query.duration;
  const rating = req.query.rating;
  const releaseDecade = releaseYear + 10;

  try {

    //Use the CASE clause
    const filters = [];
    const values = [];
    if(releaseYear) {
      filters.push("(release_year BETWEEN $1 AND $2)");
      values.push(releaseYear, releaseDecade);
    };
    if(duration) {
      filters.push("duration=$3");
      values.push(duration);
    };
    if(rating) {
      filters.push("rating=$4");
      values.push(rating);
    };

    const resultQuery = filters.length ? filters.join(" AND ") : '' ;
    console.log(resultQuery);
    
    const result = await client.query(`SELECT * FROM netflix_shows 
                                      WHERE 
                                      ${resultQuery}
                                      ORDER BY release_year LIMIT ${itemCount}`, [...values]);
    console.log("Filter year endpoint");
    console.log(result.rows);
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

app.listen(port, () => console.log(`Listening on localhost:${port}`));
