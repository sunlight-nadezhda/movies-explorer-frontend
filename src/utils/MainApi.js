class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  register({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include'
    })
      .then(this._getResponseData);
  }

  authorize({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
      .then(this._getResponseData);
  }

  logOut = () => {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(this._getResponseData);
  };

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include'
    })
      .then(this._getResponseData);
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
      credentials: 'include'
    })
      .then(this._getResponseData);
  }

  getSavedFilms() {
    return fetch(`${this._url}/movies`, {
      credentials: 'include'
    })
      .then(this._getResponseData);
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
      return response.json().catch(() => Promise.reject(new Error('Unknown server response')));
    }
    return response.json()
      .then(
        (data) => Promise.reject(new Error(data.message || 'Ошибка' + response.statusText || 'Ошибка' + response.status || 'Unknown error')),
        () => Promise.reject(new Error('Ошибка' + response.statusText || 'Ошибка' + response.status || 'Unknown server response'))
      )
  }
}

const api = new Api({
  baseUrl: '//api.movies-explorer.sun.nomoredomains.monster',
  // baseUrl: 'http://localhost:3000',
});

export default api;
