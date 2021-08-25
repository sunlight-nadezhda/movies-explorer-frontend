import React from 'react';
import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MoviesCardList = (props) => {
  return (
    <section className="card-list">
      {props.isLoading ? <Preloader /> :
        props.visibleСards.length > 0 ?
          <ul className={`cards ${props.displayCards ? 'show-cards' : 'hide-block'}`}>
            {props.visibleСards.map((filmInfo) => (
              <MoviesCard
                film={filmInfo}
                key={filmInfo.id}
                isSavedMovies={props.isSavedMovies}
                onSaveFilm={props.onSaveFilm}
                onDeleteFilm={props.onDeleteFilm}
              />
            ))}
          </ul> : props.showError
            ? <ErrorMessage
              showError={props.showError}
              text={props.errorText}
            />
            : props.wasRequest
            ? <p className="nothing-found">Ничего не найдено</p>
        : ''
      }
    </section>
  );
}

export default MoviesCardList;
