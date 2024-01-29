const { Router } = require('express');

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const router = Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/me').patch(updateProfile);
router.route('/me/avatar').patch(updateAvatar);
router.route('/:id').get(getUserById).delete(deleteUser);

module.exports = router;
