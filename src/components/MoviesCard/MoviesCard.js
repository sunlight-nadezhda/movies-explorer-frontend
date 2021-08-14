import React from 'react';
import './MoviesCard.css';

class MoviesCard extends React.Component {

  render() {
    return (
      <li className="card">
        <div className="card__header">
          <div className="card__name">{this.props.card.nameRU}</div>
          <div className="card__duration">{this.props.card.duration}</div>
        </div>
        <img
          alt="Постер фильма"
          className="card__image"
          src={this.props.card.url}
        />
        <div className="card__footer">
          <button className={`card__button${!this.props.card.saved ? '' : this.props.isSavedMovies ? ' card__button_delete' : ' card__button_saved'}`}>
            {`${this.props.card.saved ? '' : 'Сохранить'}`}
          </button>
        </div>
      </li>
    );
  }
}

export default MoviesCard;
