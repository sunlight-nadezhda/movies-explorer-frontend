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
    // console.log(response.json().then(err => console.log(err.message)));
    if (response.ok) {
      return response.json();
    } //else {
    //   response.json()
    //     // .then(err => console.log(err.message))
    //     // .then((err) => {throw new Error(`${err.message}`)})
    //     .then((reason) => Promise.reject(new Error(`${reason.message}`)));
    // }
    //else {
    //   response.json()
    //     .then((err) => Promise.reject(new Error(`${err.message}`)));
    // }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
    // return Promise.reject(new Error(`Ошибка ${response.json()}`));
    // return Promise.reject(response.json);
    // return Promise.reject(new Error(`${response.message}`));
    // return Promise.reject(res => console.log(res));
    // return Promise.reject(response.message);
  }
}

const api = new Api({
  // baseUrl: 'api.movies-explorer.sun.nomoredomains.monster',
  baseUrl: 'http://localhost:3000',
});

export default api;
