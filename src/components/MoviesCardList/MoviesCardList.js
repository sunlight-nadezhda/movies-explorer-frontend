import React from 'react';
import './MoviesCardList.css';
// import Preloader from "../Preloader/Preloader";
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
  return (
    <section className="card-list">
      {/* <Preloader /> */}
      <ul className="cards">
        {props.cards.map((cardInfo) => (
          <MoviesCard
            card={cardInfo}
            key={cardInfo._id}
            isSavedMovies={props.isSavedMovies}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
