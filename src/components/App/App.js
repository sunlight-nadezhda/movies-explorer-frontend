import React, { useState, useEffect, useCallback } from 'react';
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
import { getDisplayCardsAmount } from '../../utils/getDisplayCardsAmount';
import { filterFilms } from '../../utils/filterFilms';
import { getFilteredFilms } from '../../utils/getFilteredFilms';
import { getFilmsFromLocalStorage } from '../../utils/getDataFromLocalStorage';
import { getKeywordFromLocalStorage } from '../../utils/getDataFromLocalStorage';
import { getIsBeatFilmFromLocalStorage } from '../../utils/getDataFromLocalStorage';

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

  const memoizedGetAllFilms = useCallback(
    async () => {
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
        setErrorText('???? ?????????? ?????????????? ?????????????????? ????????????. ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????');
        setVisibleCardCount(0);
        console.log(err);
      }
    },
    [],
  );

  const getSavedFilms = async () => {
    try {
      const savedFilms = await api.getSavedFilms();
      return savedFilms;
    } catch (err) {
      setIsErrorVisible(true);
      setErrorText('???? ?????????? ?????????????? ?????????????????? ????????????. ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????');
      console.log(err)
    }
  };

  const memoizedGetFilms = useCallback(
    async () => {
      const allFilms = await memoizedGetAllFilms();
      const savedFilms = await getSavedFilms();
      return { allFilms, savedFilms };
    },
    [memoizedGetAllFilms],
  );

  const collection = location.pathname === '/saved-movies'
    ? savedFilms
    : films;

  const getVisibleCards = (collection, keyword, isBeatFilm) => {
    if (location.pathname === '/saved-movies') return [];
    if (!keyword) return [];
    let filteredCards = filterFilms(collection, keyword, isBeatFilm);
    filteredCards = filteredCards.filter(((v, k) => k < visibleCardCount));
    return filteredCards;
  };

  let filteredCards = getFilteredFilms(collection, searchKeyword, isBeatFilm);

  let visible??ards = getVisibleCards(collection, searchKeyword, isBeatFilm);

  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setSearchKeyword(keyword);
    localStorage.setItem('keyword', JSON.stringify(keyword));
    localStorage.setItem('isBeatFilm', JSON.stringify(true));
    filteredCards = getFilteredFilms(collection, searchKeyword, isBeatFilm);
    visible??ards = getVisibleCards(collection, keyword, isBeatFilm);
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
          memoizedCheckAuth();
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
          memoizedCheckAuth();
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
            localStorage.clear();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const memoizedCheckAuth = useCallback(
    () => {
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
    },
    [history, location.pathname],
  );

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
        setSavedFilms([...savedFilms, dataFilm]);
        setIsLoading(false);
        setDisplayCards(true);
        setWasRequest(true);
      })
      .catch((err) => {
        setIsErrorVisible(true);
        setErrorText('???? ?????????? ?????????????? ?????????????????? ????????????. ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????');
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
        setIsErrorVisible(true);
        setErrorText('???? ?????????? ?????????????? ?????????????????? ????????????. ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????');
        console.log(err);
      });
  };

  useEffect(() => {
    if (!loggedIn) return;
    (async () => {
      const { allFilms, savedFilms } = await memoizedGetFilms();
      setFilms(allFilms);
      setSavedFilms(savedFilms);
    })();
    const initialKeyword = getKeywordFromLocalStorage() || '';
    const isBeatFilm = getIsBeatFilmFromLocalStorage() === null ? true : getIsBeatFilmFromLocalStorage();
    setSearchKeyword(initialKeyword);
    setIsBeatFilm(isBeatFilm);
  }, [loggedIn, memoizedGetFilms]);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      return;
    }
    if (
      visible??ards.length &&
      collection.length &&
      visible??ards.length < filteredCards.length)
    {
      setDisplayMore(true);
    } else {
      setDisplayMore(false);
    }
  }, [collection, visible??ards, location.pathname, filteredCards.length]);

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
    memoizedCheckAuth();
  }, [memoizedCheckAuth]);

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
            cards={visible??ards}
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
