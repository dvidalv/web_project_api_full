import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Cambiar foto de perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-link"
        type="url"
        placeholder="Enlace a la Imagen"
        required
        name="link"
        ref={inputRef}
      />
      <input
        className="popup__submit popup__submit_update-perfil"
        type="submit"
        value="Guardar"
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
