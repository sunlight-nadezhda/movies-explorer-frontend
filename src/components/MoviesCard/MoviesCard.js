import React from 'react';
import './MoviesCard.css';

class MoviesCard extends React.Component {

  render() {
    return (
      <li className="card">
        <div className="card__header">
          <div className="card__name">В погоне за Бенкси</div>
          <div className="card__time">27 минут</div>
        </div>
        <div className="card__image"></div>
        <div className="card__footer">
          <button className="card__button card__button_saved"></button>
        </div>
      </li>
    );
  }
}

export default MoviesCard;
