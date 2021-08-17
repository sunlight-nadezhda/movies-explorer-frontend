import React from 'react';
import './MoviesCard.css';

const MoviesCard = (props) => {
  return (
    <li className="card">
      <div className="card__header">
        <div className="card__name">{props.card.nameRU}</div>
        <div className="card__duration">{props.card.duration}</div>
      </div>
      <img
        alt="Постер фильма"
        className="card__image"
        src={props.card.url}
      />
      <div className="card__footer">
        <button className={`card__button${!props.card.saved ? '' : props.isSavedMovies ? ' card__button_delete' : ' card__button_saved'}`}>
          {`${props.card.saved ? '' : 'Сохранить'}`}
        </button>
      </div>
    </li>
  );
}

export default MoviesCard;
