export const BASE_URL = 'http://localhost:3000';

// Registrar un nuevo usuario
export const register = (name, about, avatar, email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, about, avatar, email, password }),
	})
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    // .catch((err) => console.log(err));

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
