import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import cards from '../../utils/cards';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Menu from '../Menu/Menu';
import MoviesApi from '../../utils/MoviesApi';

const App = () => {
  const [films, setfilms] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState(false);
  const [showError, setShowError] = useState(false);
  const [wasRequest, setWasRequest] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const selectSavedCards = () => {
    setSavedCards(cards.filter((item) => item.saved));
  };

  const handleGetFilms = (isBeatFilm, keyWord) => {
    setIsLoading(true);
    MoviesApi.getFilms()
      .then(dataFilms => {
        const byTitle = film => film.nameRU.toLowerCase().includes(keyWord.toLowerCase());
        const byDuration = film => film.duration <= 40;
        const selectedFilms = isBeatFilm
          ? dataFilms.filter(byDuration).filter(byTitle)
          : dataFilms.filter(byTitle);
        setfilms(selectedFilms);
        localStorage.setItem('selectedFilms', JSON.stringify(selectedFilms));
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
        console.log(dataFilms);
      })
      .catch((err) => {
        setShowError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    selectSavedCards();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route exact path="/">
          <Main
            loggedIn={false}
          />
        </Route>
        <Route path="/movies">
          <Movies
            loggedIn={true}
            films={films}
            isSavedMovies={false}
            onOpenMenu={handleOpenMenu}
            onGetFilms={handleGetFilms}
            isLoading={isLoading}
            displayCards={displayCards}
            showError={showError}
            wasRequest={wasRequest}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            loggedIn={true}
            cards={savedCards}
            isSavedMovies={true}
            onOpenMenu={handleOpenMenu}
          />
        </Route>
        <Route path="/profile">
          <Profile
            loggedIn={true}
            onOpenMenu={handleOpenMenu}
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <Menu
        isOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
      />
    </div>
  );
}

export default App;
