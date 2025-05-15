const assert = require('node:assert');
const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

//4.8: blogilistan testit, step 1
test('bloglist is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs');

  assert.strictEqual(res.body.length, helper.initialBlogs.length);
});

//4.9: blogilistan testit, step2
test('blogs have id field', async () => {
  const res = await api.get('/api/blogs');

  res.body.forEach((blog) => {
    assert.strictEqual(blog.id != null, true);
  });
});

//4.10: blogilistan testit, step3
test('new blog can be added ', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/blogs');
  const blogs = res.body;

  //blogien määrä kasvaa yhdellä
  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);

  //varmistus, että oikeansisältöinen blogi on lisätty järjestelmään
  const titles = blogs.map((blog) => {
    return blog.title;
  });
  assert(titles.includes('Type wars'));
});

//4.11*: blogilistan testit, step4

test('if likes is not provided => add property likes:0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/blogs');
  const blogs = res.body;

  const newBlogItem = blogs.find((blog) => blog.title === newBlog.title);
  assert.strictEqual(newBlogItem.likes, 0);
});

//4.12*: blogilistan testit, step5
test('blog without title => 400 error', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('blog without url => 400 error', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    likes: 2,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

//4.13 blogilistan laajennus, step1
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(!titles.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });
});

//4.14* blogilistan laajennus, step2
test('updated blog likes', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedLikes = blogToUpdate.likes + 1;

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: updatedLikes })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/blogs');
  const blogs = res.body;

  const updatedBlog = blogs.find((blog) => blog.id === blogToUpdate.id);
  assert.strictEqual(updatedBlog.likes, updatedLikes);
});

after(async () => {
  await mongoose.connection.close();
});
