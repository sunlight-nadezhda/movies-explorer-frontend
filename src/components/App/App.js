import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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
import { CurrentUserContext } from '../../utils/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  // const [films, setfilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);
  const [visibleСards, setVisibleCards] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState(false);
  const [wasRequest, setWasRequest] = useState(false);
  const [displayMore, setDisplayMore] = useState(false);
  const [numberCards, setNumberCards] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [showError, setShowError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
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
    const localFilms = localStorage.getItem('films');
    let films;
    if (!localFilms) {
      moviesApi.getFilms()
        .then(dataFilms => {
          films = dataFilms.map((film) => {
            const {
              director,
              duration,
              year,
              description,
              trailerLink: trailer,
              nameRU,
              nameEN,
              id: movieId,
            } = film;
            const country = film.country || '';
            const image = film.image.url;
            const thumbnail = film.image.formats.thumbnail.url;

            return {
              country,
              director,
              duration,
              year,
              description,
              image,
              trailer,
              nameRU,
              nameEN,
              thumbnail,
              movieId};
          });
          // setfilms(dataFilms);
          localStorage.setItem('films', JSON.stringify(films));
        })
        .catch((err) => {
          setShowError(true);
          setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          console.log(err);
        });
    } else {
      const localFilms = JSON.parse(localStorage.getItem('films'));
      films = localFilms;
      // setfilms(localFilms);
    }
    setIsLoading(false);
    setDisplayCards(true);
    setWasRequest(true);
    const byTitle = film => film.nameRU.toLowerCase().includes(keyWord.toLowerCase());
    const byDuration = film => film.duration <= 40;
    const selectedFilms = isBeatFilm
      ? films.filter(byDuration).filter(byTitle)
      : films.filter(byTitle);
    setFilteredFilms(selectedFilms);
    setVisibleCards(selectedFilms.filter((v, k) => k < numberCards.maxFirstShowCards));
  };

  const handleActualResize = () => {
    const screenWidth = window.screen.width;
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
    console.log(filteredFilms.length);
    if (filteredFilms.length) {
      setVisibleCards(filteredFilms.filter((v, k) => k < visibleСards.length + numberCards.numberAdd));
    }
  };

  const onRegister = (userData) => {
    setLoggedIn(true);
    api.register(userData)
      .then((response) => {
        if (response) {
          setCurrentUser({
            name: userData.name,
            email: userData.email,
          });
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setShowError(true);
        setErrorText(err.message);
        console.log(err);
      });
  };

  const onLogin = (userData) => {
    api.authorize(userData)
      .then((response) => {
        if (response) {
          checkAuth();
        }
      })
      .catch((err) => {
        setShowError(true);
        setErrorText(err.message);
        console.log(err);
      });
  };

  const onSignOut = () => {
    if (loggedIn) {
      api.logOut()
        .then((response) => {
          if (response) {
            setLoggedIn(false);
            setCurrentUser(null);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const checkAuth = () => {
    api.checkToken()
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => console.log(err));
  }

  const handleEditProfile = (data) => {
    setIsLoading(true);
    api.editProfile(data)
      .then((userData) => {
        setIsLoading(false);
        setCurrentUser(userData);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText(err.message);
        console.log(err);
      });
  };

  const handleSaveFilm = (film) => {
    setIsLoading(true);
    console.log(film);
    api.saveFilm(film)
      .then(dataFilm => {
        setSavedFilms([...savedFilms, dataFilm]);
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
        console.log('save dataFilm ', dataFilm);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
  };

  const handleDeleteFilm = (film) => {
    setIsLoading(true);
    console.log('savedFilms ', savedFilms);
    api.deleteFilm(film._id)
      .then(dataFilm => {
        setSavedFilms((state) => state.filter((c) => c._id !== film._id));
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
        console.log('del dataFilm ', dataFilm);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    console.log('savedFilms ', savedFilms);
    api.getSavedFilms()
      .then(dataFilms => {
        setSavedFilms(dataFilms);
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
        console.log('savedFilms load', dataFilms);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
    setSavedFilms();
  }, []);

  useEffect(() => {
    if (visibleСards.length && filteredFilms.length && visibleСards[visibleСards.length - 1].id !== filteredFilms[filteredFilms.length - 1].id) {
      setDisplayMore(true);
    } else {
      setDisplayMore(false);
    }
  }, [visibleСards, filteredFilms]);

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

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            <Login
              onLogin={onLogin}
              showError={showError}
              errorText={errorText}
            />
          </Route>
          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            isSavedMovies={false}
            onOpenMenu={handleOpenMenu}
            onGetFilms={handleGetFilms}
            isLoading={isLoading}
            displayCards={displayCards}
            showError={showError}
            errorText={errorText}
            wasRequest={wasRequest}
            cards={visibleСards}
            displayMore={displayMore}
            onAddCards={handleAddMoreByClick}
            onSaveFilm={handleSaveFilm}
            onDeleteFilm={handleDeleteFilm}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            cards={savedFilms}
            isSavedMovies={true}
            onOpenMenu={handleOpenMenu}
            displayCards={true}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onOpenMenu={handleOpenMenu}
            onEditProfile={handleEditProfile}
            onSignOut={onSignOut}
            showError={showError}
            errorText={errorText}
          />
          <ProtectedRoute
            path="*"
            loggedIn={loggedIn}
            component={PageNotFound}
          />
          <Route>
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>

        <Menu
          isOpen={isMenuOpen}
          onCloseMenu={handleCloseMenu}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
