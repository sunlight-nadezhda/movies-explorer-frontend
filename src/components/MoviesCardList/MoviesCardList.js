import React from 'react';
import PropTypes from 'prop-types';
import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MoviesCardList = (props) => {
  return (
    <section className="card-list">
      {props.isLoading ? <Preloader /> :
        props.cards.length > 0 ?
          <ul className={`cards ${props.displayCards || props.isSavedMovies ? 'show-cards' : 'hide-block'}`}>
            {props.cards.map((filmInfo) => (
              <MoviesCard
                film={filmInfo}
                key={filmInfo.movieId}
                isSavedMovies={props.isSavedMovies}
                isFilmSaved={props.savedFilms.some((film) => film.movieId === filmInfo.movieId)}
                savedFilms={props.savedFilms}
                setIsFilmSaved={props.setIsFilmSaved}
                onSaveFilm={props.onSaveFilm}
                onDeleteFilm={props.onDeleteFilm}
              />
            ))}
          </ul> : props.isErrorVisible
            ? <ErrorMessage
              isErrorVisible={props.isErrorVisible}
              text={props.errorText}
            />
            : props.wasRequest
            ? <p className="nothing-found">Ничего не найдено</p>
        : ''
      }
    </section>
  );
}

MoviesCardList.propTypes = {
  savedFilms: PropTypes.arrayOf(PropTypes.object).isRequired
};

MoviesCardList.defaultProps = {
  savedFilms: []
};

export default MoviesCardList;
