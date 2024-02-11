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

router.route('/:cardId').get(authenticateToken, getCardById);
router.route('/:cardId').delete(deleteCard);

router
  .route('/:cardId/likes')
  .put(authenticateToken, likeCard)
  .put(authenticateToken, dislikeCard);

module.exports = router;
