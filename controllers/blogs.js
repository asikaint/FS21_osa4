const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response,next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(error) {
    next(error)
  }
})

// teht 4.10
blogsRouter.post('/', async (request, response,next) => {
  try {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch(error) {
    next(error)
  }

})

module.exports = blogsRouter