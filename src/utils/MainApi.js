class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  saveFilm(filmInfo) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filmInfo),
      credentials: 'include'
    })
      .then(this._getResponseData);
  }

  deleteFilm(filmId) {
    return fetch(`${this._url}/movies/${filmId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
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
  // baseUrl: 'api.movies-explorer.sun.nomoredomains.monster',
  baseUrl: 'http://localhost:3000',
});

export default api;
