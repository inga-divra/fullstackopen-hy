require('dotenv').config();
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/blogs');

app.use(express.json());

//Server check
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use('/api/blogs', blogsRouter);

module.exports = app;
