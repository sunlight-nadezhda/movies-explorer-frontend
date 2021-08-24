import React from 'react';
import './MoviesCard.css';

const MoviesCard = (props) => {
  const handleSaveClick = () => {
    props.onSaveFilm(props.film);
  };

  const handleDeleteClick = () => {
    props.onDeleteFilm(props.film);
  };

  return (
    <li className="card">
      <a href={props.film.trailerLink} className="card__link" target="_blank" rel="noopener noreferrer">
        <div className="card__header">
          <div className="card__name">{props.film.nameRU}</div>
          <div className="card__duration">{props.film.duration}</div>
        </div>
        <img
          alt="Постер фильма"
          className="card__image"
          src={'https://api.nomoreparties.co' + props.film.image.url}
        />
      </a>
        <div className="card__footer">
        <button className={`card__button${!props.film.saved ? '' : props.isSavedMovies ? ' card__button_delete' : ' card__button_saved'}`} onClick={handleSaveClick}>
            {`${props.film.saved ? '' : 'Сохранить'}`}
          </button>
        </div>

    </li>
  );
}

export default MoviesCard;
