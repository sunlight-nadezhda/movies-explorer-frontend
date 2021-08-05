import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main
              loggedIn={false}
            />
          </Route>
          <Route path="/movies">
            <Movies
              loggedIn={true}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
