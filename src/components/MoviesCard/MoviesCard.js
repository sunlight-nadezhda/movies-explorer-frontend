import React, { useState, useEffect } from 'react';
import './MoviesCard.css';

const MoviesCard = (props) => {
  // const [buttonClassName, setButtonClassName] = useState('card__button');
  const [isButtonSaved, setIsButtonSaved] = useState(false);

  const handleSaveClick = () => {
    // const {
    //   director,
    //   duration,
    //   year,
    //   description,
    //   trailerLink: trailer,
    //   nameRU,
    //   nameEN,
    //   id: movieId,
    // } = props.film;
    // const country = props.film.country || '';
    // const image = props.film.image.url;
    // const thumbnail = props.film.image.formats.thumbnail.url;

    // props.onSaveFilm({
    //   country,
    //   director,
    //   duration,
    //   year,
    //   description,
    //   image,
    //   trailer,
    //   nameRU,
    //   nameEN,
    //   thumbnail,
    //   movieId
    // });

    props.onSaveFilm(props.film);

    setIsButtonSaved(true);
  };

  const handleDeleteClick = () => {
    props.onDeleteFilm(props.film);
  };

  useEffect(() => {
    if (props.film.id) {
      setIsButtonSaved(true);
    }
  }, []);

  return (
    <li className="card">
      <a href={props.film.trailerLink} className="card__link" target="_blank" rel="noopener noreferrer">
        <div className="card__header">
          <div className="card__name">{props.film.nameRU}</div>
          <div className="card__duration">{props.film.duration + ' минут'}</div>
        </div>
        <img
          alt="Постер фильма"
          className="card__image"
          src={'https://api.nomoreparties.co' + props.film.image}
        />
      </a>
      <div className="card__footer">
        {/* <button className={`card__button${!props.film.saved ? '' : props.isSavedMovies ? ' card__button_delete' : ' card__button_saved'}`} onClick={handleSaveClick}>
          {`${props.film.saved ? '' : 'Сохранить'}`}
        </button> */}
        {/* <button className={buttonClassName} onClick={handleSaveClick}>
          {`${props.film.saved ? '' : 'Сохранить'}`}
        </button> */}
        <button className={`card__button${!isButtonSaved ? '' : props.isSavedMovies ? ' card__button_delete' : ' card__button_saved'}`} onClick={handleSaveClick}>
          {`${isButtonSaved ? '' : 'Сохранить'}`}
        </button>
      </div>

    </li>
  );
}

export default MoviesCard;
