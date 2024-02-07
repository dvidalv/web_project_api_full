import editButton from '../images/Edit-Button.svg';
import editPerfil from '../images/editPerfil.svg';
import addButton from '../images/Add-Button.svg';
import ImagePopup from './ImagePopup';
import Card from './Card';
import { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditPerfil,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  selectedCard,
  closePopupImage,
  onDeleteClick,
  isDeletePopupOpen,
  cards,
  onCardLike,
}) {
  const { userData } = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar">
            <img
              className="profile__imagen"
              src={userData.user?.avatar}
              alt="Imagen de perfil"
            />
            <div className="profile__overlay">
              <img
                onClick={onEditAvatar}
                className="profile__edit-icon"
                src={editPerfil}
                alt="icon edit"
              />
            </div>
          </div>

          <div className="profile__info">
            <div className="profile__contenedor-titulo">
              <h1 className="profile__title">{userData.user?.name}</h1>
              <button
                onClick={onEditPerfil}
                type="button"
                className="edit-button"
              >
                <img src={editButton} alt="edit button" />
              </button>
            </div>
            <p className="profile__subtitle">{userData.user?.about}</p>
          </div>
        </div>

        <div className="profile__button">
          <img
            onClick={onAddPlace}
            className="add-button"
            src={addButton}
            alt="icono boton agregar"
          />
        </div>
      </section>

      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              card={card}
              onDeleteClick={onDeleteClick}
              onCardLike={onCardLike}
              isDeletePopupOpen={isDeletePopupOpen}
            />
          ))}
        </ul>
      </section>
      <AnimatePresence>
        {selectedCard && (
          <ImagePopup
            key="imagePopup"
            card={selectedCard}
            onClose={closePopupImage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default Main;
