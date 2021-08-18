import React from 'react';
import './MoviesCard.css';

const MoviesCard = (props) => {
  return (
    <li className="card">
      <div className="card__header">
        <div className="card__name">{props.film.nameRU}</div>
        <div className="card__duration">{props.film.duration}</div>
      </div>
      <img
        alt="Постер фильма"
        className="card__image"
        src={'https://api.nomoreparties.co' + props.film.image.url}
      />
      <div className="card__footer">
        <button className={`card__button${!props.film.saved ? '' : props.isSavedMovies ? ' card__button_delete' : ' card__button_saved'}`}>
          {`${props.film.saved ? '' : 'Сохранить'}`}
        </button>
      </div>
    </li>
  );
}

export default MoviesCard;
