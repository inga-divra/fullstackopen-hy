const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// Get ALL BLOGS
blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Create NEW BLOG
blogsRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'Please provide title and url' });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save blog' });
  }
});

//4.13 blogilistan laajennus, step1
//DELETE Blog
blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    return res.status(400).json({ error: 'incorrect id' });
  }
});

//4.14* blogilistan laajennus, step2
// UPDATE LIKES in Blog
blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body;

  try {
    const blogToUpdate = await Blog.findById(req.params.id);
    if (!blogToUpdate) {
      return res.status(404).end();
    }

    blogToUpdate.likes = likes;
    await blogToUpdate.save();
    res.json(blogToUpdate);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update blog likes' });
  }
});

module.exports = blogsRouter;
