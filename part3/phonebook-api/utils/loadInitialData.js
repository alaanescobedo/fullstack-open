const Person = require('../models/personModel')

function loadInitialData({ persons }) {
  persons.forEach(({ name, number }) => {
    const newPerson = new Person({
      name,
      number
    })

    newPerson.save()
      .then(() => {
        console.log(`${name} saved to database with the number ${number}`)
      })
  })
}

module.exports = loadInitialData
