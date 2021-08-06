import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

class MoviesCardList extends React.Component {

  render() {
    return (
      <section className="card-list">
        <ul className="cards">
          <MoviesCard />
        </ul>
      </section>
    );
  }
}

export default MoviesCardList;
