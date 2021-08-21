import React, { useState } from 'react';
import './Movies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";

const Movies = (props) => {
  const [displayMore, setDisplayMore] = useState(false);
  return (
    <div className="page">
      <Header
        loggedIn={props.loggedIn}
        onOpenMenu={props.onOpenMenu}
      />
      <main>
        <SearchForm onGetFilms={props.onGetFilms} />
        <MoviesCardList
          films={props.films}
          isSavedMovies={props.isSavedMovies}
          displayCards={props.displayCards}
          isLoading={props.isLoading}
          showError={props.showError}
          wasRequest={props.wasRequest}
        />
        <More displayBlock={displayMore} />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
