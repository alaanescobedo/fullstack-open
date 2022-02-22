const mongoose = require('mongoose')

// Create mongo URL
const url = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD
)

// Mongo Connect
const configMongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(url, configMongoose)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(`Error connecting to MongoDB: ${err}`))

module.exports = mongoose