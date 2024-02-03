export const BASE_URL = 'http://localhost:3000';

// Registrar un nuevo usuario
export const register = (name, about, avatar, email, password) => {
  return fetch(`${BASE_URL}/users/signup`, {
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
    });
  // .catch((err) => console.log(err));
};

//login and get token
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/users/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    return response.json();
  })
  .then((res) => {
    console.log(res)
    return res;
  });
};

// comprueba el token la validez del token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
