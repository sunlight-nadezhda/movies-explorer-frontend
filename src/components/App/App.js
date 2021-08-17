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

const App = () => {
  // const [cards, setCards] = useState(cards);
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const selectSavedCards = () => {
    setSavedCards(cards.filter((item) => item.saved));
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
            cards={cards}
            isSavedMovies={false}
            onOpenMenu={handleOpenMenu}
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
