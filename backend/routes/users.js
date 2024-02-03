const { Router } = require('express');
const { validateUser } = require('../models/user');
const authenticateToken = require('../middlewares/auth');

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
} = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers);

router.post('/signin', login);

router.post('/signup', validateUser, createUser);

router.route('/me').get(getCurrentUser).patch(updateProfile);

router.patch('/me/avatar', authenticateToken, updateAvatar);

router.get('/:id', authenticateToken, getUserById).delete('/:id', deleteUser);

module.exports = router;
