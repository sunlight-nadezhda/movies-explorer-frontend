import React from 'react';
import './MoviesCard.css';

class MoviesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: props.saved,
    };
  }

  render() {
    return (
      <li className="card">
        <div className="card__header">
          <div className="card__name">В погоне за Бенкси</div>
          <div className="card__time">27 минут</div>
        </div>
        <img
          alt="Постер фильма"
          className="card__image"
          src={this.props.link}
        />
        <div className="card__footer">
          <button className={`card__button${this.state.saved ? ' card__button_saved' : ''}`}>
            {`${this.state.saved ? '' : 'Сохранить'}`}
          </button>
        </div>
      </li>
    );
  }
}

export default MoviesCard;
