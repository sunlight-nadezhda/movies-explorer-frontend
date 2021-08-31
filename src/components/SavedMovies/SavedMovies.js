import React from 'react';
import PropTypes from 'prop-types';
import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = (props) => {
  return (
    <div className="page">
      <Header
        loggedIn={props.loggedIn}
        onOpenMenu={props.onOpenMenu}
      />
      <main>
        <SearchForm onGetFilms={props.onGetFilms} isSavedMoviesPage={true} />
        <MoviesCardList
          cards={props.cards}
          isSavedMovies={props.isSavedMovies}
          savedFilms={props.cards}
          displayCards={props.displayCards}
          onDeleteFilm={props.onDeleteFilm}
        />
      </main>
      <Footer />
    </div>
  );
}

SavedMovies.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired
};

SavedMovies.defaultProps = {
  cards: []
};


export default SavedMovies;
