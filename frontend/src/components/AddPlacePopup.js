import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const nameRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }
  
  useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  });

  return (
    <PopupWithForm
      name={'element'}
      title={'Nueva Imagen'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="nombre-input"
        className="popup__input popup__input_nombre"
        type="text"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        required
        name="name"
        ref={nameRef}
      />
      <input
        id="aboutMe-input"
        className="popup__input popup__input_about-me"
        type="text"
        placeholder="Acerca de mi"
        minLength="2"
        maxLength="200"
        required
        name="link"
        ref={linkRef}
      />
      <input
        className="popup__submit popup__submit_perfil"
        type="submit"
        value="Guardar"
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
