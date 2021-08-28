import './MoviesCard.css';

const MoviesCard = (props) => {
  const handleSaveClick = () => {
    props.onSaveFilm(props.film);
  };

  const handleDeleteClick = (event) => {
    props.onDeleteFilm(props.film);
  };

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
        <button className={`card__button${!props.isFilmSaved ? '' : props.isSavedMovies ? ' card__button_delete' : ' card__button_saved'}`} onClick={props.isFilmSaved ? handleDeleteClick : handleSaveClick}>
          {`${props.isFilmSaved ? '' : 'Сохранить'}`}
        </button>
      </div>

    </li>
  );
}

export default MoviesCard;
