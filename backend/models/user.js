// esquemas de usuarios
const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String, // Tipo de dato
    required: true, // Requerido
    minlength: 2, // Mínimo de caracteres
    maxlength: 30, // Máximo de caracteres
  },
  about: {
    type: String, // Tipo de dato
    required: true, // Requerido
    minlength: 2, // Mínimo de caracteres
    maxlength: 30, // Máximo de caracteres
  },
  avatar: {
    type: String, // Tipo de dato
    required: true, // Requerido
    validate: {
      validator(v) {
        const urlRegex =
          // eslint-disable-next-line no-useless-escape
          /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return urlRegex.test(v);
      },
      message: 'Debe ser una URL válida',
    },
  },
  email: {
    type: String, // Tipo de dato
    required: true, // Requerido
    unique: true, // Único
    validate: { // Validación personalizada
      validator(v) { // Función de validación
        return validator.isEmail(v); // Devuelve true o false
      },
      message: 'Debe ser un email válido',
    },
  },
  password: {
    type: String, // Tipo de dato
    required: true, // Requerido
    minlength: 8, // Mínimo de caracteres
    select: false, // No se mostrará en la respuesta
  },
});

// exportar el modelo
module.exports = mongoose.model('user', userSchema);
