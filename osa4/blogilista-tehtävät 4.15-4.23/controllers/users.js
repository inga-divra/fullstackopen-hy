const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

//GET all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

//CREATE new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({ error: 'Password is required' });
  }
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password must be at least 3 characters' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return response
        .status(400)
        .json({ error: 'expected `username` to be unique' });
    }

    return response.status(500).json({ error: error.message });
  }
});

module.exports = usersRouter;
