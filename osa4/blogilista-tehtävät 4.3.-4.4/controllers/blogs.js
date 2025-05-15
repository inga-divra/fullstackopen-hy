const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// Get ALL BLOGS
blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

// Create NEW BLOG
blogsRouter.post('/', (req, res) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  blog.save().then((savedBlog) => {
    res.status(201).json(savedBlog);
  });
});

module.exports = blogsRouter;
