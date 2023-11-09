require('dotenv').config();

const express = require('express');
const app = express();

const pgClient = require('./pgClient');

app.get('/', async (req, res) => {
  const dbInstance = await pgClient.getDBInstance();
  const result = await dbInstance.query('SELECT * FROM users');
  res.json({result: result.rows});
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});