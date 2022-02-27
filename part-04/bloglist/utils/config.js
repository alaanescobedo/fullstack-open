require('dotenv').config()

const PORT = process.env.PORT || 3003
let MONGODB_URI = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD
)

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI.replace(
    '<PASSWORD>',
    process.env.MONGODB_PASSWORD
  )
}

module.exports = {
  PORT,
  MONGODB_URI
}
