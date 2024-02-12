import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ onCardClick, card, onDeleteClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  // console.log(card);

  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = card.owner === currentUser._id;

  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = card.likes.some((i) => i === currentUser._id);
  // console.log(isLiked);

  function handleLikeClick(card) {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <li className="card">
      <div className="card__image-container">
        <img
          onClick={() => onCardClick(card)}
          className="card__imagen"
          src={card.link}
          alt={card.name}
        />
      </div>
      <div className="card__contenido">
        <div className="card__info">
          <p className="card__title">{card.name}</p>
          <div
            className={`card_dislike ${isLiked ? 'card_like' : ''}`}
            onClick={() => {
              handleLikeClick(card);
            }}
          ></div>
        </div>
        <span className="card__likes card__like-counter">
          {card.likes.length}
        </span>
      </div>
      <i
        onClick={handleDeleteClick}
        className={`fa-solid fa-trash ${isOwn ? 'card__delete-button' : ''}`}
      ></i>
    </li>
  );
}

export default Card;
