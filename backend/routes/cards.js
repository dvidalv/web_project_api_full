const { Router } = require('express');

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

router.route('/:cardId').get(getCardById).delete(deleteCard);

router.route('/:cardId/likes').put(likeCard).put(dislikeCard);

module.exports = router;
