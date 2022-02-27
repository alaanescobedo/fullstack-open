const http = require('http')
const app = require('./app')
const { logger } = require('./utils')

const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
