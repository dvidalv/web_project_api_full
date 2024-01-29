import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function DeletePopup({ isOpen, onClose, onCardDelete, onKeyDown }) {
  const { cardToDelete } = useContext(CurrentUserContext);
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(cardToDelete);
  }

  return (
    <PopupWithForm
      title={'Estas Seguro?'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__submit popup__submit_deleteCard"
        type="submit"
        value="Si"
      />
    </PopupWithForm>
  );
}

export default DeletePopup;
