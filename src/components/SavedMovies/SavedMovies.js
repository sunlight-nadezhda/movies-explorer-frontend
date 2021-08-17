import React from 'react';
import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = (props) => {
  return (
    <div className="page">
      <Header
        loggedIn={props.loggedIn}
        onOpenMenu={props.onOpenMenu}
      />
      <main>
        <SearchForm />
        <MoviesCardList
          cards={props.cards}
          isSavedMovies={props.isSavedMovies}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
