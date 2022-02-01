const { json } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// // Tehtävä 4.9
test('blog id', async () => {
  const response = await api.get('/api/blogs')
  const respObj = response.body
  expect(response.body.map(body => body.id)[0]).toBeDefined()
})

// Teht 4.10
test('add new blog', async () => {
  const newBlog = {
    title: "UusiBlogi",
    author: "TAs",
    url: "www.tasblog.fi",
    likes: "1"
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  
  const blogs = await helper.blogsInDb() // Get blogs
  expect(blogs).toHaveLength(helper.initialBlogs.length+1)

  const titles = blogs.map(res => res.title)

  expect(titles).toContain(
    'UusiBlogi'
    )
})

//Tee testi, joka varmistaa, että jos kentälle likes ei anneta arvoa, asetetaan sen arvoksi 0. Muiden kenttien sisällöstä ei tässä tehtävässä vielä välitetä.
// 4.11
test('add non liked blog', async () => {
  const newBlog = {
    title: "nonLikedBlog",
    author: "NoLikey",
    url: "www.badblog.fi",
  }
  const response = await api.post('/api/blogs')
    .send(newBlog)
  expect(response.body.likes).toEqual(0)
})

test('no author and title', async () => {
  const newBlog = {
    url: "www.testing.fi",
    likes: 1,
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})