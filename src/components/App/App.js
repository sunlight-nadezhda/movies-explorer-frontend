import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Menu from '../Menu/Menu';
import moviesApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';

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
  const [numberCards, setNumberCards] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const history = useHistory();

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleGetFilms = (isBeatFilm, keyWord) => {
    setIsLoading(true);
    let numberCards;
    if (!numberCards) {
      numberCards = handleActualResize();
      setNumberCards(numberCards);
    }
    // const localFilms = localStorage.getItem('selectedFilms');
    moviesApi.getFilms()
      .then(dataFilms => {
        const byTitle = film => film.nameRU.toLowerCase().includes(keyWord.toLowerCase());
        const byDuration = film => film.duration <= 40;
        const selectedFilms = isBeatFilm
          ? dataFilms.filter(byDuration).filter(byTitle)
          : dataFilms.filter(byTitle);
        setfilms(selectedFilms);
        localStorage.setItem('selectedFilms', JSON.stringify(selectedFilms));
        console.log('numberCards fetch ', numberCards);
        setVisibleCards(selectedFilms.filter((v, k) => k < numberCards.maxFirstShowCards));
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
        console.log('dataFilms ', dataFilms);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
    // } // else {
    //   setfilms(localFilms);
    //   console.log('numberCards local ', numberCards);
    //   setVisibleCards(JSON.parse(localFilms).filter((v, k) => k < numberCards.maxFirstShowCards));
    //   setIsLoading(false);
    //   setDisplayCards(true);
    //   setWasRequest(true);
    //   console.log('localFilms ', JSON.parse(localFilms));
    // }
  };

  const handleActualResize = () => {
    const screenWidth = window.screen.width;
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

  const handleAddMoreByClick = () => {
    console.log(films.length);
    if (films.length) {
      setVisibleCards(films.filter((v, k) => k < visibleСards.length + numberCards.numberAdd));
    }
  };

  const onRegister = (userData) => {
    api.register(userData)
      .then((response) => {
        if (response) {
          history.push("/movies");
        }
      })
      .catch((err) => {
        setShowError(true);
        setErrorText(err.message);
        console.log(err);
      });
  };

  const handleSaveFilm = (film) => {
    setIsLoading(true);
    api.saveFilm(film)
      .then(dataFilm => {
        setSavedCards([...savedCards, dataFilm]);
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
        console.log('dataFilm ', dataFilm);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
  };

  const handleDeleteFilm = (film) => {
    setIsLoading(true);
    api.deleteFilm(film._id)
      .then(dataFilm => {
        setSavedCards((state) => state.filter((c) => c._id !== film._id));
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
        console.log('dataFilm ', dataFilm);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
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
    const resizeThrottler = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          setNumberCards(handleActualResize());
        }, 67);
      }
    };

    window.addEventListener('resize', resizeThrottler);

    return () => {
      window.removeEventListener('resize', resizeThrottler);
    };
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <Register
            onRegister={onRegister}
            showError={showError}
            errorText={errorText}
          />
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
            errorText={errorText}
            wasRequest={wasRequest}
            visibleСards={visibleСards}
            displayMore={displayMore}
            onAddCards={handleAddMoreByClick}
            onSaveFilm={handleSaveFilm}
            onDeleteFilm={handleDeleteFilm}
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
