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
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  console.log(typeof body.title === "undefined");

  console.log(typeof body.author === "undefined");

  if (typeof body.author !== "undefined" && typeof body.title !== "undefined") {
    try {
      const result = await blog.save()
      response.status(201).json(result)
    } catch(error) {
      next(error)
    }
  } else {
    return response.status(400).send({
      message: 'no author and title defined'
    });
  }
})

module.exports = blogsRouter