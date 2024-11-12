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
        const result = await client.query(`SELECT * FROM netflix_shows LIMIT $1`, [itemCount]);

        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('server error');   
    };
});

app.get('/releaseYear', async(req, res) => {
    const itemCount = parseInt(req.query.itemCount) || 12;
    const releaseYear = parseInt(req.query.releaseYear) || null;

    try {
        const result = await client.query(`SELECT * FROM netflix_shows WHERE release_year = 2000 LIMIT $1`, [itemCount]);
        res.json(result.rows);
    } catch(err) {
        console.error('server error');
        res.status(500).send('server error');
    };
});

app.get('/duration', async(req, res) => {
    const itemCount = parseInt(req.query.itemCount) || 12;
    const duration = req.query.duration || null;

    try {
        const result = await client.query(`SELECT * FROM netflix_shows WHERE duration='1 Season' LIMIT $1`, [itemCount]);
        res.json(result.rows);
    } catch(err) {
        console.error('server error');
        res.status(500).send('server error');
    };
});

app.get('/rating', async(req, res) => {
    const itemCount = parseInt(req.query.itemCount) || 12;
    const rating = req.query.rating || null;

    try {
        const result = await client.query(`SELECT * FROM netflix_shows WHERE rating=$1 LIMIT $2`, [rating, itemCount]);
        console.log('made it to rating endpoint');
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('ssss');
    };
});

app.get('/releaseYear', async(req, res) => {
    const itemCount = parseInt(req.query.itemCount) || 12;
    const releaseYear = parseInt(req.query.rating) || null;

    try {
        const result = await client.query(`SELECT * FROM netflix_shows WHERE release_year=$1 LIMIT $2`, [releaseYear, itemCount]);
        console.log('made it to release year endpoint');
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('server error');
    };
});

app.get('/duration', async(req, res) => {
    const itemCount = parseInt(req.query.itemCount) || 12;
    const duration = req.query.duration || null;

    try {
        const result = await client.query(`SELECT * FROM netflix_shows WHERE duration=$1 LIMIT $2`, [duration, itemCount]);
        console.log('made it to duration endpoint');
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('server error');
    };
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));