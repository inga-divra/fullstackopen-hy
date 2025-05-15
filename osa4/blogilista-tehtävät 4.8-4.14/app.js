require('dotenv').config();
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const config = require('./utils/config');
const mongoose = require('mongoose');

logger.info('Connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) =>
    logger.error('Error connecting to MongoDB:', error.message)
  );

app.use(express.json());

//Server check
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use('/api/blogs', blogsRouter);

module.exports = app;
