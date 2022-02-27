const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogsModel')
const { listWithMultipleBlogs } = require('../utils/test_helper')

describe('GET /api/v1/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsArray = listWithMultipleBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogsArray.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })

  test('should respond with json', async () => {
    const result = await api.get('/api/v1/blogs')
    expect(result.type).toBe('application/json')
    expect(result.status).toBe(200)
  })

  test('blogs should include an id property', async () => {
    const result = await api.get('/api/v1/blogs')
    expect(result.body[0].id).toBeDefined()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})
