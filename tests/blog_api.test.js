const { json } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

// // Tehtävä 4.9
test('blog id', async () => {
  const response = await api.get('/api/blogs')
  const respObj = response.body
  console.log(response.body.map(body => body.id));
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

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length+1)

  const titles = response.body.map(res => res.title)

  expect(titles).toContain(
    'UusiBlogi'
    )

})

afterAll(() => {
  mongoose.connection.close()
})