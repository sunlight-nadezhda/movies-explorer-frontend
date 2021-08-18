class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  getFilms() {
    return fetch(`${this._url}`)
      .then(this._getResponseData);
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
  }
}

const api = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default api;
