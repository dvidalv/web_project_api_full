// export const BASE_URL = 'localhost:3000';
import url from '../utils/constants';
export const BASE_URL = url;

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
    });
  // .catch((err) => console.log(err));
};

//login and get token
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((res) => {
      return res.token;
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });
};

// comprueba el token la validez del token
export const checkToken = async (token) => {
  // console.log('token', token);
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      // Aquí puedes manejar diferentes códigos de estado específicos si es necesario
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    // Considerar lanzar el error o manejarlo según sea necesario
  }
};
