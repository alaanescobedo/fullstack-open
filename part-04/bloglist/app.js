const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { config, logger, middleware } = require('./utils')
const blogsRouter = require('./controllers/blogsController')
const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/v1/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
