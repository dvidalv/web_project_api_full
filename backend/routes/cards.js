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

router
  .route('/')
  .get(authenticateToken, getAllCards)
  .post(authenticateToken, createCard);

router
  .route('/:cardId')
  .get(authenticateToken, getCardById)
  .delete(authenticateToken, deleteCard);

router
  .route('/likes/:cardId')
  .put(authenticateToken, likeCard)
  .delete(authenticateToken, dislikeCard);

module.exports = router;
