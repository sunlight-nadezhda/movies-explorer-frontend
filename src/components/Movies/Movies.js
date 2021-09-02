import React from 'react';
import './Movies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";



const Movies = (props) => {
  const {
    isBeatFilm,
    searchKeyword,
    cards,
    onSearchSubmit,
    onIsBeatFilmChanged
  } = props;
  return (
    <div className="page">
      <Header
        loggedIn={props.loggedIn}
        onOpenMenu={props.onOpenMenu}
      />
      <main>
        <SearchForm
          onGetFilms={props.onGetFilms}
          isSavedMoviesPage={false}
          isBeatFilm={isBeatFilm}
          setIsBeatFilm={props.setIsBeatFilm}
          keyWord={props.keyWord}
          setKeyWord={props.setKeyWord}
          initialKeyword={searchKeyword}
          onSubmit={onSearchSubmit}
          onIsBeatFilmChanged={onIsBeatFilmChanged}
        />
        <MoviesCardList
          isSavedMovies={props.isSavedMovies}
          savedFilms={props.savedFilms}
          setIsFilmSaved={props.setIsFilmSaved}
          displayCards={props.displayCards}
          isLoading={props.isLoading}
          showError={props.showError}
          wasRequest={props.wasRequest}
          cards={cards}
          onSaveFilm={props.onSaveFilm}
          onDeleteFilm={props.onDeleteFilm}
          errorText={props.errorText}
        />
        <More displayBlock={props.displayMore} onAddCards={props.onAddCards} />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
