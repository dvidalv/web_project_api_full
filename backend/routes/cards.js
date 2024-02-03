const { Router } = require('express');
const authenticateToken = require('../middlewares/auth');

const {
  getAllCards,
  createCard,
  deleteCard,
  getCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const router = Router();

router.route('/').get(getAllCards).post(createCard);

router.route('/cards/:cardId').get(getCardById).delete(deleteCard);

router.route('/:cardId/likes').put(likeCard).put(dislikeCard);

module.exports = router;
