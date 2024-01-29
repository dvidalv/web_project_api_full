const token = '9d080c9f-32ec-43d7-9e8d-be1fdad6fe1b';

class Api {
	constructor() {
		this.groupId = 'web_es_09';
		this._token = token;
		this._url = `https://around.nomoreparties.co/v1/${this.groupId}/`;
	}
	async fetchData(url, method, data) {
		try {
			const result = await fetch(`${url}`, {
				method,
				headers: {
					authorization: this._token,
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
	
	async getUserInfo() {
		return await this.fetchData(`${this._url}users/me`, 'GET');
	}
	
	async getInitialCards(resource) {
		return await this.fetchData(`${this._url}${resource}`, 'GET');
	}


	async getUserAvatar(resource) {
		return await this.fetchData(`${this._url}${resource}`);
	}
	async setUserAvatar(data) {
		return await this.fetchData(`${this._url}users/me/avatar`, 'PATCH', data);
	}

	async patchUserInfo(data) {
		return await this.fetchData(`${this._url}users/me`, 'PATCH', data);
	}
	async addCard(data) {
		return await this.fetchData(`${this._url}cards`, 'POST', data);
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
