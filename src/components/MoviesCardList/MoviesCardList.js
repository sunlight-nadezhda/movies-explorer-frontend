import React from 'react';
import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MoviesCardList = (props) => {
  return (
    <section className="card-list">
      {props.isLoading ? <Preloader /> :
        props.films.length > 0 ?
          <ul className={`cards ${props.displayCards ? 'show-cards' : 'hide-block'}`}>
            {props.films.map((filmInfo) => (
              <MoviesCard
                film={filmInfo}
                key={filmInfo.id}
                isSavedMovies={props.isSavedMovies}
              />
            ))}
          </ul> : props.showError
            ? <ErrorMessage
              showError={props.showError}
              text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            />
            : props.wasRequest
            ? <p className="nothing-found">Ничего не найдено</p>
        : ''
      }
    </section>
  );
}

export default MoviesCardList;
