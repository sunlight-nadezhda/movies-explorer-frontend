import React from 'react';
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: cards,
      savedCards: cards.filter((item) => item.saved)
    };
  }

  render() {
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
              cards={this.state.cards}
              isSavedMovies={false}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              loggedIn={true}
              cards={this.state.savedCards}
              isSavedMovies={true}
            />
          </Route>
          <Route path="/profile">
            <Profile
              loggedIn={true}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
