import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
    };
  }

  render() {
    return (
      <div className="page">
        <Header
          loggedIn={this.state.loggedIn}
        />
        <SearchForm />
        <Footer />
      </div>
    );
  }
}

export default Movies;
