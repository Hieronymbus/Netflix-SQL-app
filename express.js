import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
const app = express();
const port = 3000;

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
        const result = await client.query('SELECT * FROM netflix_shows');
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).send('server error');
    };
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));