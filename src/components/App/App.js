import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from "../Main/Main";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
