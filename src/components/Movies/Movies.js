import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";

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
          onOpenMenu={this.props.onOpenMenu}
        />
        <main>
          <SearchForm />
          <MoviesCardList
            cards={this.props.cards}
            isSavedMovies={this.props.isSavedMovies}
          />
          <More />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Movies;
