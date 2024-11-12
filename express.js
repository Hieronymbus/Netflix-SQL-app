import express from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Client } = pkg;
const app = express();
const port = 3000;  

app.use(cors());

const client = new Client({
  user: 'myuser',
  host: 'localhost',
  database: 'netflix',
  password: 'mypassword',
  port: 5432,
});
client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error ', err.stack));

app.get('/', async(req, res) => {
    try {
        const itemCount = parseInt(req.query.itemCount) || 12;
        const releaseYear = parseInt(req.query.releaseYear) || null;
        const rating = req.query.rating || null;
        const duration = req.query.duration || null;

        let sqlCommand;

        if(orderByReleaseYear) {
            sqlCommand = `SELECT * FROM netflix_shows WHERE release_year = ${releaseYear}`;
        } else if(duration) {
            sqlCommand = `SELECT * FROM netflix_shows WHERE duration = ${duration}`;
        } else if(orderByRating) {
            sqlCommand = `SELECT * FROM netflix_shows WHERE rating = ${rating}`;
        };
        
        const result = await client.query(`${sqlCommand} LIMIT $1`, [itemCount]);



        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('server error');   
    };
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));