const httpStatus = require('http-status'); // Importamos el módulo http-status
const { User } = require('../models/user'); // Importamos el modelo de usuarios
const bcrypt = require('bcryptjs'); // Importamos bcryptjs

const createUser = async (req, res) => {
  try {
    const { name, about, avatar, email, password } = req.body; // Obtenemos los datos del usuario del body de la petición
    const newUser = {
      // Creamos un nuevo usuario
      name,
      about,
      avatar,
      email,
      password,
    };
    const hash = await bcrypt.hash(newUser.password, 10); // Hash password
    newUser.password = hash; // Asignamos la contraseña hasheada al usuario
    console.log(newUser);
    const user = await User.create(newUser); // Creamos el usuario en la base de datos

    return res.status(httpStatus.CREATED).json({
      // Devolvemos el usuario creado
      status: 'success',
      message: 'User created',
      user,
    });
  } catch (err) {
    // Si hay un error en la creación del usuario lo capturamos aquí y devolvemos un error
    if (err.name === 'ValidationError') {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid user data',
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Unexpected error',
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Obtenemos los datos del usuario del body de la petición
    const user = await User.findUserByCredentials(email, password); // Buscamos el usuario por email y contraseña
    const token = await generateAuthToken(user); // Generamos el token
    return res.status(httpStatus.OK).json({ // Devolvemos el usuario y el token
      status: 'success',
      message: 'User logged in',
      token,
    });
  } catch (err) {
    // console.log(err);
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: 'error',
      message: 'Invalid credentials',
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).orFail(() => {
      const error = new Error('No se ha encontrado ningún usuario');
      error.statusCode = 404;
      throw error;
    });
    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Users found',
      users,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Unexpected error',
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).orFail(() => {
      const error = new Error('No se ha encontrado ningun usuario con esa id');
      error.statusCode = 404;
      throw error;
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'User not found',
      });
    }
    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'User found',
      user,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Unexpected error',
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id).orFail(() => {
      const error = new Error('No se ha encontrado ninguna tarjeta con esa id');
      error.statusCode = 404;
      throw error;
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'User not found',
      });
    }
    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'User deleted',
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Unexpected error',
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error('No se ha encontrado ninguna tarjeta con esa id');
      error.statusCode = 404;
      throw error;
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'User not found',
      });
    }
    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'User updated',
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Unexpected error',
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    console.log(req.user._id);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error('No se ha encontrado ninguna tarjeta con esa id');
      error.statusCode = 404;
      throw error;
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'User not found',
      });
    }
    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'User updated',
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Unexpected error',
    });
  }
};

const generateAuthToken = async (user) => {
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
  );
  return token;
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateProfile,
  updateAvatar,
  login,
  generateAuthToken,
};
