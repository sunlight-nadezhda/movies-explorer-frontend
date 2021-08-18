import React from 'react';
import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
  return (
    <section className="card-list">
      {props.isLoading ? <Preloader /> :
        <ul className={`cards ${props.displayCards ? 'show-cards' : 'hide-block'}`}>
          {props.films.map((filmInfo) => (
            <MoviesCard
              film={filmInfo}
              key={filmInfo.id}
              isSavedMovies={props.isSavedMovies}
            />
          ))}
        </ul>
      }
    </section>
  );
}

export default MoviesCardList;
