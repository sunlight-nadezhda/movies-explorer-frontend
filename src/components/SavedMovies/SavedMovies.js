import React from 'react';
import PropTypes from 'prop-types';
import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filterByKeyword, filterBeatFilms } from '../../utils/filterFilms';

const SavedMovies = (props) => {
  const {
    isBeatFilm,
    searchKeyword,
    cards,
    onSearchSubmit,
    onIsBeatFilmChanged
  } = props;

  let filteredCards = cards;
  if (isBeatFilm) {
    filteredCards = filterBeatFilms(filteredCards)
  }
  if (searchKeyword !== '') {
    filteredCards = filterByKeyword(filteredCards, searchKeyword)
  }
  return (
    <div className="page">
      <Header
        loggedIn={props.loggedIn}
        onOpenMenu={props.onOpenMenu}
      />
      <main>
        <SearchForm
          initialKeyword={searchKeyword}
          isBeatFilm={isBeatFilm}
          onSubmit={onSearchSubmit}
          onIsBeatFilmChanged={onIsBeatFilmChanged}
        />
        <MoviesCardList
          cards={filteredCards}
          isSavedMovies={true}
          savedFilms={filteredCards}
          displayCards={true}
          onDeleteFilm={props.onDeleteFilm}
        />
      </main>
      <Footer />
    </div>
  );
}

SavedMovies.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  isBeatFilm: PropTypes.bool.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onIsBeatFilmChanged: PropTypes.func.isRequired
};

export default SavedMovies;
