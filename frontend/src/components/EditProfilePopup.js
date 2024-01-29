import PopupWithForm from './PopupWithForm';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const { currentUser } = useContext(CurrentUserContext);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (currentUser) {
			setName(currentUser.name || '');
			setDescription(currentUser.about || '');
		}
	}, [currentUser]);

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name,
			about: description,
		});
	}

	return (
		<PopupWithForm
			name="edit"
			title="Editar Perfil"
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
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				id="aboutMe-input"
				className="popup__input popup__input_about-me"
				type="text"
				placeholder="Acerca de mi"
				minLength="2"
				maxLength="200"
				required
				name="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<input
				className="popup__submit popup__submit_perfil"
				type="submit"
				value="Guardar"
			/>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
