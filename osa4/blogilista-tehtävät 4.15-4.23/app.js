require('dotenv').config();
const express = require('express');
const app = express();
const { tokenExtractor, userExtractor } = require('./middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
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

//middlewares
app.use(express.json());
app.use(tokenExtractor);

//Server check
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
