export const BASE_URL = 'https://register.nomoreparties.co';

let isLoggedIn = false;
export const getIsLoggedIn = () => isLoggedIn;
export const setIsLoggedIn = (value) => {
	return (isLoggedIn = value);
};

// Registrar un nuevo usuario
export const register = (password, email) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password, email }),
	}).then((response) => {
		return response.json();
	});
};

//login and get token
export const authorize = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password, email }),
	}).then((response) => response.json());
};

// comprueba el token la validez del token
export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
};
