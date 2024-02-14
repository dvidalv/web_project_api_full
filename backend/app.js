const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();
app.use(express.json());

// conéctate al servidor MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

app.use(requestLogger); // registrar todas las solicitudes HTTP

// MIDDLEWARES
app.use(morgan('dev'));

// Opciones de CORS para permitir solicitudes de ciertos orígenes
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://api.alrededorusa.mooo.com',
    'https://alrededorusa.mooo.com',
    'https://www.alrededorusa.mooo.com',
  ],
  credentials: true, // Para permitir cookies de sesión en las solicitudes entre dominios
  allowedHeaders: 'Content-Type, Authorization', // Para permitir el token de autorización en las solicitudes
  allowedMethods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS', // Para permitir los métodos HTTP
};

// eslint-disable-next-line no-undef
app.use(cors(corsOptions));

app.use(requestLogger); // registrar todas las solicitudes HTTP

// Rutas publicas
app.use('/users', usersRouter);

// Rutas protegidas
app.use('/cards', cardsRouter);

app.use(errorLogger); // registrar errores HTTP
// app.use(errors()); // manejar errores celebrados por Joi

// MIDDLEWARE - Not found handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// MIDDLEWARE - server error
app.use((err, req, res) => {
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.error('Error log:', err.stack);
  } else {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }

  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Ha ocurrido un error en el servidor');
  } else {
    res.status(500).json({
      message: 'Ha ocurrido un error en el servidor',
      error: err.message,
      stack: err.stack,
    });
  }
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  // console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
