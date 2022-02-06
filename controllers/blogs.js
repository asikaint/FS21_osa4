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

blogsRouter.delete('/:id', async (request, response,next) => {
  const blogId = request.params.id
  try {
    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.put('/:id', async (request,response,next) => {
  const blogId = request.params.id
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const doc = await Blog.findByIdAndUpdate(blogId,blog,{new : true})
    response.json(doc.toJSON())
  } catch(exception) {
    next(exception)
  }
})




module.exports = blogsRouter