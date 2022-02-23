require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/personModel')
const { errorHandler } = require('./utils')

const PORT = process.env.PORT || 3001
const BUILD_PATH = '../../part-02/phonebook/dist'
const app = express()

// Logger configuration (morgan)
const morganConfiguration = ':method :url :status :res[content-length] - :response-time ms:body'
morgan.token('body', (req, res) => JSON.stringify(req.body))

// Middlewares
app.use(express.json())
app.use(morgan(morganConfiguration))
app.use(cors())
app.use(express.static(BUILD_PATH))

// Routes
app.get('/info', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p>
    <span>${new Date().toString()}</span>`
    )
  } catch (error) {
    next(error)
  }
})
app.get('/api/v1/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    if (!persons) {
      return res.status(404).send({
        error: 'No entries found'
      })
    }
    res.json(persons)
  } catch (error) {
    next(error)
  }
})
app.get('/api/v1/persons/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const person = await Person.findById(id)
    if (!person) {
      return res.status(404).json({
        message: 'Person not found'
      })
    }
    res.send(person)
  } catch (error) {
    next(error)
  }
})
app.post('/api/v1/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body

    if (!name || !number) {
      return res.status(400).json({
        error: 'Name and number are required'
      })
    }

    const personToCreate = await Person.find({ name })

    if (personToCreate.length > 0) {
      return res.status(409).json({
        error: 'Person already exist in the phonebook'
      })
    }

    const newPerson = new Person({
      name,
      number
    })

    const savedPerson = await newPerson.save()
    res.send(savedPerson)
  } catch (error) {
    next(error)
  }
})
app.put('/api/v1/persons/:id', async (req, res, next) => {
  try {
    const { name, number } = req.body
    const { id } = req.params

    if (!name || !number) {
      return res.status(400).json({
        error: 'Name and number are required'
      })
    }

    const personToUpdate = await Person.findById(id)

    if (!personToUpdate) {
      return res.status(404).json({
        error: 'Person not found'
      })
    }

    const updatedPersonData = {
      name: personToUpdate.name,
      number
    }

    const updatedPerson = await Person.findByIdAndUpdate(personToUpdate.id, updatedPersonData, {
      new: true,
      runValidators: true
    })

    res.send(updatedPerson)
  } catch (error) {
    next(error)
  }
})
app.delete('/api/v1/persons/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const personToDelete = await Person.findByIdAndRemove(id)
    if (!personToDelete) {
      return res.status(404).json({
        message: 'Person Not Found'
      })
    }

    res.send({ statusCode: 204, message: 'Person deleted' })
  } catch (error) {
    next(error)
  }
})

// Route Not Found 404
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown route' })
}
app.use(unknownEndpoint)

// Error Handler
app.use(errorHandler)

// Server Listen
app.listen(PORT)
