import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const history = useHistory();
  let location = useLocation();

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const getFilmsFromApi = async () => {
    const rawFilms = await moviesApi.getFilms();
    return rawFilms.map(({
      director,
      duration,
      year,
      description,
      trailerLink: trailer,
      nameRU,
      nameEN,
      id: movieId,
      country,
      image: {
        url,
        formats: {
          thumbnail: { url: thumbnailUrl }
        },
      },
    }) => ({
      country: country || 'country',
      director,
      duration,
      year,
      description,
      image: url,
      trailer,
      nameRU,
      nameEN,
      thumbnail: thumbnailUrl,
      movieId
    }));
  };

  const getFilmsFromLocalStorage = () => {
    const rawFilms = localStorage.getItem('films');
    if (!rawFilms) return null;
    try {
      return JSON.parse(rawFilms);
    } catch (err) {
      return null;
    }
  };

  const handleGetFilms = async (isBeatFilm, keyWord) => {
    setIsLoading(true);
    const numberCards = handleActualResize();
    const localFilms = getFilmsFromLocalStorage();
    try {
      const films = localFilms === null
        ? await getFilmsFromApi()
        : localFilms;
      if (localFilms === null) {
        localStorage.setItem('films', JSON.stringify(films));
      }
      const selectedFilms = films.filter(({ nameRU, duration }) => {
        if (isBeatFilm && duration > 40) return false;
        return nameRU.toLowerCase().includes(keyWord.toLowerCase());
      });
      setFilteredFilms(selectedFilms);
      setVisibleCards(selectedFilms.filter((v, k) => k < numberCards.maxFirstShowCards));
    } catch (err) {
      setShowError(true);
      setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      setFilteredFilms([]);
      setVisibleCards([]);
      console.log(err);
    }
    setIsLoading(false);
    setDisplayCards(true);
    setWasRequest(true);
    setNumberCards(numberCards);
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
    api.register(userData)
      .then((response) => {
        if (response) {
          setCurrentUser({
            name: userData.name,
            email: userData.email,
          });
          checkAuth();
          setLoggedIn(true);
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
          history.push(location.pathname === '/signup'
            || location.pathname === '/signin'
            ? '/movies' : location.pathname === '/movies'
              || location.pathname === '/saved-movies'
              || location.pathname === '/profile'
              ? location.pathname
              : '/not-found');
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
        setShowSuccessMessage(true);
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
        setSavedFilms([...savedFilms, dataFilm]);
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
  };

  const handleDeleteFilm = (clickedFilm) => {
    setIsLoading(true);
    const deletedFilm = savedFilms.find((film) => film.movieId === clickedFilm.movieId);
    api.deleteFilm(deletedFilm._id)
      .then(dataFilm => {
        setSavedFilms((state) => state.filter((c) => c._id !== deletedFilm._id));
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
      })
      .catch((err) => {
        setShowError(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      api.getSavedFilms()
        .then(dataFilms => {
          setSavedFilms(dataFilms);
          setIsLoading(false);
          setDisplayCards(true);
          setWasRequest(true);
        })
        .catch((err) => {
          setShowError(true);
          setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (visibleСards.length && filteredFilms.length && visibleСards[visibleСards.length - 1].movieId !== filteredFilms[filteredFilms.length - 1].movieId) {
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
            savedFilms={savedFilms}
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
            onDeleteFilm={handleDeleteFilm}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            savedFilms={savedFilms}
            onOpenMenu={handleOpenMenu}
            onEditProfile={handleEditProfile}
            onSignOut={onSignOut}
            showError={showError}
            errorText={errorText}
            showSuccessMessage={showSuccessMessage}
          />
          <ProtectedRoute
            path="/not-found"
            loggedIn={loggedIn}
            component={PageNotFound}
          />
          <Route>
            {/* {!loggedIn && (<Redirect to="/signin" />)} */}
            {!loggedIn && (<Redirect to="/" />)}
          </Route>
          {/* <Redirect to="/not-found" /> */}
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
