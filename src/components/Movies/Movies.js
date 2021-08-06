import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

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
        <main>
          <SearchForm />
          <Preloader />
          <MoviesCardList />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Movies;
