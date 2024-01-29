const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { requestLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();

// conéctate al servidor MongoDB

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('¡Estamos conectados a la base de datos');
});

app.use(requestLogger); // registrar todas las solicitudes HTTP

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

// add user to req object
app.use((req, res, next) => {
  req.user = {
    _id: '65888d350085018635d99c8b',
  };
  next();
});

// ROUTES
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

// app.use(errorLogger); // registrar errores HTTP

// app.use(errors()); // manejar errores celebrados por Joi

// MIDDLEWARE - Not found handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
  next();
});

// MIDDLEWARE - server error
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack); // Log error stack to console
  res.status(500).send('ha ocurrido un error en el servidor');
  next(new Error('algo salió mal'));
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
