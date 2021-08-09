import React from 'react';
import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
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
          <MoviesCardList
            cards={this.props.cards}
            isSavedMovies={this.props.isSavedMovies}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Movies;
