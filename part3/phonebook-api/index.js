const express = require('express')
const cors = require('cors')

const morgan = require('morgan')
const { persons } = require('./db.json')

const app = express()

// Logger configuration (morgan)
const morganConfiguration = ':method :url :status :res[content-length] - :response-time ms:body'
morgan.token('body', (req, res) => JSON.stringify(req.body))

// Middlewares
app.use(express.json())
app.use(morgan(morganConfiguration))
app.use(cors())

// Routes
app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <span>${new Date().toString()}</span>`
  )
})
app.get('/api/v1/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/v1/persons/:id', (req, res) => {
  const { id } = req.params
  const person = persons.find(person => person.id === Number(id))
  if (!person) {
    return res.status(404).json({
      message: 'Person not found'
    })
  }
  res.send(person)
})
app.post('/api/v1/persons', (req, res) => {
  const { name, number } = req.body
  const randomId = Math.floor(Math.random() * 100000)

  if (!name || !number) {
    return res.status(400).json({
      error: 'Name and number are required'
    })
  }

  const personAlreadyExist = persons.find(person => person.name === name)

  if (personAlreadyExist) {
    res.status(409).json({
      error: 'Person already exist in the phonebook'
    })
  }

  const newPersonData = {
    name,
    number,
    id: randomId
  }

  persons.push(newPersonData)

  res.send(newPersonData)
})
app.put('/api/v1/persons/:id', (req, res) => {
  const { name, number } = req.body
  const { id } = req.params

  if (!name || !number) {
    return res.status(400).json({
      error: 'Name and number are required'
    })
  }

  const personsToUpdate = persons.find(person => person.id === Number(id))
  if (!personsToUpdate) {
    return res.status(404).json({
      error: 'Person not found'
    })
  }

  const updatedPersonData = {
    name,
    number,
    id
  }

  persons.forEach(person => {
    if (person.id === Number(id)) {
      person.name = name
      person.number = number
    }
  })

  res.send(updatedPersonData)
})
app.delete('/api/v1/persons/:id', (req, res) => {
  const { id } = req.params
  const person = persons.find(person => person.id === Number(id))
  if (!person) {
    return res.status(404).json({
      message: 'Person Not Found'
    })
  }
  persons.splice(persons.indexOf(person), 1)
  res.send({ statusCode: 204, message: 'Person deleted' })
})

// Not Found 404
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown route' })
}
app.use(unknownEndpoint)

// Server Listen
app.listen(3001, () => {
  console.log('Server running on port 3001')
})
