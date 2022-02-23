const blogsRouter = require('express').Router()
const Blog = require('../models/blogsModel')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = await new Blog(req.body)
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter
