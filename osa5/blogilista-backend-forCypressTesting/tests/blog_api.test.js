const assert = require('node:assert');
const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const api = supertest(app);

let token;

const getToken = async () => {
  const testUser = await api.post('/api/login').send({
    username: 'root',
    password: 'sekret',
  });

  return testUser.body.token;
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });
  await user.save();

  const login = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' });
  token = login.body.token;

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user._id })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
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
//4.23*: blogilistan laajennus, step11
test('new blog can be added ', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
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

//4.23*: blogilistan laajennus, step11
//testi, joka varmistaa että uuden blogin lisäys ei onnistu,
// ja pyyntö palauttaa oikean statuskoodin 401 Unauthorized jos pyynnön mukana ei ole tokenia.
test('new blog cannot be added WITHOUT token => 401 Unauthorized ', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  };

  await api.post('/api/blogs').send(newBlog).expect(401);
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
    .set('Authorization', `Bearer ${token}`)
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

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test('blog without url => 400 error', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    likes: 2,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

//4.13 blogilistan laajennus, step1
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

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

// 4.16*: blogilistan laajennus, step4
describe('when there is initially one user at db', () => {
  test('password is less then 3 char', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sa',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert(
      response.body.error.includes('Password must be at least 3 characters')
    );
  });

  test('password is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert(response.body.error.includes('Password is required'));
  });

  test('username is not unique', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(response.body.error.includes('expected `username` to be unique'));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test('valid username and password', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'salainen',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => {
  await mongoose.connection.close();
});
