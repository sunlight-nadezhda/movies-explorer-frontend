import React from 'react';
import './MoviesCardList.css';
// import Preloader from "../Preloader/Preloader";
import MoviesCard from '../MoviesCard/MoviesCard';

class MoviesCardList extends React.Component {

  render() {
    return (
      <section className="card-list">
        {/* <Preloader /> */}
        <ul className="cards">
          {this.props.cards.map((cardInfo) => (
            <MoviesCard
              card={cardInfo}
              key={cardInfo._id}
              isSavedMovies={this.props.isSavedMovies}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default MoviesCardList;
