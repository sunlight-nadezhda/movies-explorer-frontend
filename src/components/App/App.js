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
  const [visibleСards, setVisibleCards] = useState([]);
  const [displayMore, setDisplayMore] = useState(false);
  const [numberCards, setNumberCards] = useState({});

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
        setVisibleCards(selectedFilms.filter((v, k) => k < numberCards.maxFirstShowCards));
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

  const handleActualResize = (e) => {
    const screenWidth = e.target.screen.width;
    console.log(screenWidth);
    if (screenWidth < 481) {
      return {
        maxFirstShowCards: 5,
        numberAdd: 2,
      };
    } else if (screenWidth < 1020) {
      return {
        maxFirstShowCards: 8,
        numberAdd: 2,
      };
    } else {
      return {
        maxFirstShowCards: 12,
        numberAdd: 3,
      };
    }
  };

  useEffect(() => {
    if (visibleСards.length && films.length && visibleСards[visibleСards.length - 1].id !== films[films.length - 1].id) {
      setDisplayMore(true);
    } else {
      setDisplayMore(false);
    }
  }, [visibleСards, films]);

  useEffect(() => {
    let resizeTimeout;
    const resizeThrottler = (e) => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          setNumberCards(handleActualResize(e));
        }, 67);
      }
    };

    window.addEventListener('resize', resizeThrottler);
  });

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
            isSavedMovies={false}
            onOpenMenu={handleOpenMenu}
            onGetFilms={handleGetFilms}
            isLoading={isLoading}
            displayCards={displayCards}
            showError={showError}
            wasRequest={wasRequest}
            visibleСards={visibleСards}
            displayMore={displayMore}
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
