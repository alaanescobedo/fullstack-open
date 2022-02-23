const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name must be unique'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: [true, 'Phone number must be unique'],
    minlength: [8, 'Phone number must be at least 8 characters long'],
    maxlength: [15, 'Phone number must be at most 15 characters long']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

module.exports = Person
