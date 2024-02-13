import url from '../utils/constants';
class Api {
  constructor() {
    this._url = url;
  }
  async fetchData(url, method, data, token) {
    try {
      if (method === 'GET') {
        const resp = await fetch(`${url}`, {
          method,
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (resp.ok) {
          return await resp.json();
        }
        return await Promise.reject(`Error: ${resp.status}`);
      }

      if (method === 'DELETE') {
        const resp = await fetch(`${url}`, {
          method,
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (resp.ok) {
          return await resp.json();
        }
        return await Promise.reject(`Error: ${resp.status}`);
      }

      const result = await fetch(`${url}`, {
        method,
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (result.ok) {
        return await result.json();
      }

      return await Promise.reject(`Error: ${result.status}`);
    } catch (error) {
      throw error;
    }
  }

  async changeLikeCardStatus(id, isLike, token) {
    return await this.fetchData(
      `${this._url}cards/likes/${id}`,
      isLike ? 'PUT' : 'DELETE',
      isLike ? { like: true } : { like: false },
      token
    );
  }

  async deleteCard(resource, cardId, token) {
    return await this.fetchData(
      `${this._url}${resource}/${cardId}`,
      'DELETE',
      null,
      token
    );
  }

  async getUserInfo(token) {
    return await this.fetchData(`${this._url}/me`, 'GET', null, token);
  }

  async getInitialCards(token) {
    // console.log(this._url);
    return await this.fetchData(`${this._url}/cards`, 'GET', null, token);
  }

  async getUserAvatar(resource) {
    return await this.fetchData(`${this._url}/${resource}`, 'GET');
  }
  async setUserAvatar(data, token) {
    return await this.fetchData(`${this._url}/me/avatar`, 'PATCH', data, token);
  }

  async patchUserInfo(data, token) {
    return await this.fetchData(`${this._url}/me`, 'PATCH', data, token);
  }
  async addCard(newCard, token) {
    return await this.fetchData(`${this._url}/cards`, 'POST', newCard, token);
  }

  async dislikeCard(resource, card_Id) {
    return await this.fetchData(
      `${this._url}/${resource}/${card_Id}`,
      'DELETE'
    );
  }
}
const api = new Api();

export default api;
