const httpStatus = require('http-status');

const Card = require('../models/card');

// GET /cards — devuelve todas las tarjetas
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({}); // devuelve todas las tarjetas
    res.status(httpStatus.OK).send(cards);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// POST /cards — crea una tarjeta
const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid card data' });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

// GET /cards/:cardId — devuelve una tarjeta por su id
const getCardById = async (req, res) => {
  let card;
  try {
    const { cardId } = req.params;

    card = await Card.findById(cardId).orFail();
    return card;
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Invalid cardId' });
    }
    return res.status(404).send({ message: 'No card found with this id' });
  } finally {
    if (card) {
      res.status(200).send(card);
    }
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    if (!cardId) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'cardId is required' });
    }
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'No card found with this id' });
    }
    return res.status(httpStatus.OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Invalid cardId' });
    }
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

exports.deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  try {
    const selectedCard = await Card.findById(cardId);

    if (!selectedCard) {
      return res.status(404).send('Card no encontrada');
    }

    if (selectedCard.owner.toString() !== _id) {
      return res.status(404).send('No tienes permiso para borrar esta Card');
    }

    const deletedCard = await Card.findByIdAndRemove(cardId);
    return res.json({ data: deletedCard });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send('Datos de la Card inválidos');
    }
    return res.status(500).send('Error al eliminar la Card', error);
  }
};

// PUT /cards/:cardId/likes — dar like a una tarjeta
const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    console.log('cardId', cardId);
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res.status(404).send({ message: 'No card found with this id' });
    }
    return res.status(200).send(card);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// DELETE /cards/:cardId/likes — quitar like a una tarjeta
const dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res.status(404).send({ message: 'No card found with this id' });
    }
    return res.status(200).send(card);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  getCardById,
  likeCard,
  dislikeCard,
};
