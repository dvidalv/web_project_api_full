class Api {
  constructor() {
    this._url = 'http://localhost:3000/';
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

  async getUserInfo(token) {
    return await this.fetchData(`${this._url}users/me`, 'GET', null, token);
  }

  async getInitialCards(token) {
    // console.log(this._url);
    return await this.fetchData(`${this._url}`, 'GET', null, token);
  }

  async getUserAvatar(resource) {
    return await this.fetchData(`${this._url}${resource}`, 'GET');
  }
  async setUserAvatar(data) {
    return await this.fetchData(`${this._url}users/me/avatar`, 'PATCH', data);
  }

  async patchUserInfo(data) {
    return await this.fetchData(`${this._url}users/me`, 'PATCH', data);
  }
  async addCard(newCard) {
    return await this.fetchData(`${this._url}cards`, 'POST', newCard);
  }

  async deleteCard(resource, card_Id) {
    return await this.fetchData(`${this._url}${resource}/${card_Id}`, 'DELETE');
  }

  async dislikeCard(resource, card_Id) {
    return await this.fetchData(`${this._url}${resource}/${card_Id}`, 'DELETE');
  }
  async changeLikeCardStatus(id, isLike) {
    return await this.fetchData(
      `${this._url}cards/likes/${id}`,
      isLike ? 'PUT' : 'DELETE'
    );
  }
}
const api = new Api();

export default api;
