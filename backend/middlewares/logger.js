const winston = require('winston');
const expressWinston = require('express-winston');

// crear un logger de solicitud

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

// crear un logger de errores

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
