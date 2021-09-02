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
import { constants } from '../../utils/constants';
import { filterFilms } from '../../utils/filterFilms';

const {
  durationBeatFilm,
  smallScreenWidth,
  mediumScreenWidth,
  maxFirstShowCardsOnMobile,
  maxFirstShowCardsOnNotebook,
  maxFirstShowCardsOnDesctop,
  numberAddForMoreButtonOnMobile,
  numberAddForMoreButtonOnDesctop,
} = constants;

const getDisplayCardsAmount = () => {
  const screenWidth = window.screen.width;
  if (screenWidth < smallScreenWidth) {
    return {
      maxFirstShowCards: maxFirstShowCardsOnMobile,
      numberAdd: numberAddForMoreButtonOnMobile,
    };
  } else if (screenWidth < mediumScreenWidth) {
    return {
      maxFirstShowCards: maxFirstShowCardsOnNotebook,
      numberAdd: numberAddForMoreButtonOnMobile,
    };
  } else {
    return {
      maxFirstShowCards: maxFirstShowCardsOnDesctop,
      numberAdd: numberAddForMoreButtonOnDesctop,
    };
  }
};

const App = () => {
  const [films, setFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState(true);
  const [wasRequest, setWasRequest] = useState(false);
  const [displayMore, setDisplayMore] = useState(false);
  const [numberCards, setNumberCards] = useState(getDisplayCardsAmount());
  const [errorText, setErrorText] = useState(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isBeatFilm, setIsBeatFilm] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleCardCount, setVisibleCardCount] = useState(numberCards.maxFirstShowCards);

  const history = useHistory();
  const location = useLocation();

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

  const getAllFilms = async () => {
    const localFilms = getFilmsFromLocalStorage();
    try {
      const films = localFilms === null
        ? await getFilmsFromApi()
        : localFilms;
      if (localFilms === null) {
        localStorage.setItem('films', JSON.stringify(films));
      }
      return films;
    } catch (err) {
      setIsErrorVisible(true);
      setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      setVisibleCardCount(0);
      console.log(err);
    }
  };

  const getSavedFilms = async () => {
    try {
      const savedFilms = await api.getSavedFilms();
      return savedFilms;
    } catch (err) {
      setIsErrorVisible(true);
      setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      console.log(err)
    }
  };

  const getFilms = async () => {
    const allFilms = await getAllFilms();
    const savedFilms = await getSavedFilms();
    return { allFilms, savedFilms };
  };

  const getKeywordFromLocalStorage = () => {
    const rawKeyword = localStorage.getItem('keyword');
    if (!rawKeyword) return null;
    try {
      return JSON.parse(rawKeyword);
    } catch (err) {
      return null;
    }
  };

  const getIsBeatFilmFromLocalStorage = () => {
    const rawIsBeatFilm = localStorage.getItem('isBeatFilm');
    if (!rawIsBeatFilm) return null;
    try {
      return JSON.parse(rawIsBeatFilm);
    } catch (err) {
      return null;
    }
  };

  // TODO: delete and use from another file
  const getFilteredFilms = (collection, keyWord, isBeatFilm) => collection
    .filter(({ nameRU, duration }) => {
      if (isBeatFilm && duration > durationBeatFilm) return false;
      return nameRU.toLowerCase().includes(keyWord.toLowerCase());
    });

  const collection = location.pathname === '/saved-movies'
    ? savedFilms
    : films;

  // TODO: move to Movies.js

  const getVisibleCards = (collection, keyword, isBeatFilm) => {
    if (location.pathname === '/saved-movies') return [];
    if (!keyword) return [];
    let filteredCards = filterFilms(collection, keyword, isBeatFilm);
    filteredCards = filteredCards.filter(((v, k) => k < visibleCardCount));
    return filteredCards;
  };

  let filteredCards = getFilteredFilms(collection, searchKeyword, isBeatFilm);

  let visibleСards = getVisibleCards(collection, searchKeyword, isBeatFilm);

  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setSearchKeyword(keyword);
    localStorage.setItem('keyword', JSON.stringify(keyword));
    filteredCards = getFilteredFilms(collection, searchKeyword, isBeatFilm);
    visibleСards = getVisibleCards(collection, keyword, isBeatFilm);
    setIsLoading(false);
    setDisplayCards(true);
    setWasRequest(true);
    setVisibleCardCount(numberCards.maxFirstShowCards);
  };

  const handleIsBeatFilmChanged = (value) => {
    setIsBeatFilm(value);
    localStorage.setItem('isBeatFilm', JSON.stringify(value));
  }

  const handleAddMoreByClick = () => {
    if (collection.length) {
      setVisibleCardCount(visibleCardCount + numberCards.numberAdd);
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
        setIsErrorVisible(true);
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
        setIsErrorVisible(true);
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
            || location.pathname === '/'
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
        setIsErrorVisible(true);
        setErrorText(err.message);
        console.log(err);
      });
  };

  const handleSaveFilm = (film) => {
    setIsLoading(true);
    api.saveFilm(film)
      .then(dataFilm => {
        setSavedFilms([...savedFilms, dataFilm]); // TODO: Check is setSavedFilms needed
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
      })
      .catch((err) => {
        setIsErrorVisible(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
  };

  const handleDeleteFilm = (clickedFilm) => {
    setIsLoading(true);
    const deletedFilm = savedFilms.find((film) => film.movieId === clickedFilm.movieId);
    api.deleteFilm(deletedFilm._id)
      .then(dataFilm => {
        setSavedFilms((state) => state.filter((c) => c._id !== deletedFilm._id)); // TODO: Check is setSavedFilms needed
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
      })
      .catch((err) => {
        setIsErrorVisible(true);
        setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err);
      });
  };

  useEffect(() => {
    if (!loggedIn) return;
    (async () => {
      const { allFilms, savedFilms } = await getFilms();
      setFilms(allFilms);
      setSavedFilms(savedFilms);
    })();
    // TO DO: получить параметры запроса из localStorage
    const initialKeyword = getKeywordFromLocalStorage();
    const isBeatFilm = getIsBeatFilmFromLocalStorage() === null ? true : getIsBeatFilmFromLocalStorage();
    setSearchKeyword(initialKeyword);
    setIsBeatFilm(isBeatFilm);
  }, [loggedIn]);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      return;
    }
    if (
      visibleСards.length &&
      collection.length &&
      visibleСards.length < filteredCards.length)
    {
      setDisplayMore(true);
    } else {
      setDisplayMore(false);
    }
  }, [collection, visibleСards, location.pathname]);
  // END of TODO

  useEffect(() => {
    let resizeTimeout;
    const resizeThrottler = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          setNumberCards(getDisplayCardsAmount());
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
              isErrorVisible={isErrorVisible}
              errorText={errorText}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={onLogin}
              isErrorVisible={isErrorVisible}
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
            savedFilms={savedFilms}
            onOpenMenu={handleOpenMenu}
            isLoading={isLoading}
            displayCards={displayCards}
            isErrorVisible={isErrorVisible}
            errorText={errorText}
            wasRequest={wasRequest}
            cards={visibleСards}
            displayMore={displayMore}
            onAddCards={handleAddMoreByClick}
            onSaveFilm={handleSaveFilm}
            onDeleteFilm={handleDeleteFilm}
            isBeatFilm={isBeatFilm}
            filteredFilms={getFilteredFilms(collection, searchKeyword, isBeatFilm)}
            searchKeyword={searchKeyword}
            onSearchSubmit={handleSearchSubmit}
            onIsBeatFilmChanged={handleIsBeatFilmChanged}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            cards={collection}
            isBeatFilm={isBeatFilm}
            searchKeyword={searchKeyword}
            onOpenMenu={handleOpenMenu}
            onDeleteFilm={handleDeleteFilm}
            onSearchSubmit={handleSearchSubmit}
            onIsBeatFilmChanged={handleIsBeatFilmChanged}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            savedFilms={savedFilms}
            onOpenMenu={handleOpenMenu}
            onEditProfile={handleEditProfile}
            onSignOut={onSignOut}
            isErrorVisible={isErrorVisible}
            errorText={errorText}
            showSuccessMessage={showSuccessMessage}
          />
          <ProtectedRoute
            path="/not-found"
            loggedIn={loggedIn}
            component={PageNotFound}
          />
          <Route>
            {!loggedIn && (<Redirect to="/" />)}
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
