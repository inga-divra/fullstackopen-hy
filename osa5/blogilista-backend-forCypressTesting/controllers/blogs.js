const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { userExtractor } = require('../middleware');

// Get ALL BLOGS
blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Create NEW BLOG
blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'Please provide title and url' });
  }

  //Create a new blog
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();

    // Add the blog to the user's list of blogs
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save blog' });
  }
});

//4.13 blogilistan laajennus, step1
/* blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    return res.status(400).json({ error: 'incorrect id' });
  }
}); */

//DELETE Blog 4.21*: blogilistan laajennus, step9
//4.22*: blogilistan laajennus, step10

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'User not found or token invalid' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ error: 'The blog you are searching is not found' });
    }

    if (!blog.user || blog.user.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json({ error: 'You have no permission to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
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
