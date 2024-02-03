// esquemas de usuarios
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const Joi = require('joi');
const { celebrate, Segments } = require('celebrate'); // import celebrate

const userSchemaValidation = Joi.object()
  .keys({
    name: Joi.string().empty('').default('Jacques Cousteau').min(2).max(30),
    about: Joi.string().empty('').default('Explorador').min(2).max(30),
    avatar: Joi.string().empty('').default('https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg').uri(),

    email: Joi.string()
      .required()
      .email({ tlds: { allow: true } }) // Habilita la validación de TLDs
      .messages({
        'string.email': 'Debe ser un email válido',
      }),
    password: Joi.string()
      .required()
      .min(6)
      .custom((value, helpers) => {
        if (value.length < 6) {
          return helpers.message(
            'La contraseña debe tener al menos 8 caracteres',
          );
        }
        return value;
      }, 'custom validation for password'),
  })
  .with('email', 'password'); // Si se proporciona un email, también debe proporcionarse una contraseña

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(v) {
        return Joi.attempt(v, Joi.string().uri(), 'Debe ser una URL válida');
      },
      message: 'Debe ser una UR@L válida',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Celebrate middleware for user validation
const validateUser = celebrate({
  [Segments.BODY]: userSchemaValidation,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Usuario o contraseña incorrectos'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Usuario o contraseña incorrectos'));
        }
        return user;
      });
    });
};

// exportar el modelo
module.exports = {
  User: mongoose.model('user', userSchema),
  validateUser: validateUser,
};
