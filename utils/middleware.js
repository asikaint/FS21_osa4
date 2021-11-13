const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const unknownEndPoint = (request,response) => {
    response.status(404).send({ error: 'unkwown endpoint' })
}

const errorHandler = (error,request,response,next) => {
    console.error(error.message)
    if (error.name == 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    // Jne

    next(error)
}

  module.exports = {
    requestLogger, 
    unknownEndPoint, 
    errorHandler
  }