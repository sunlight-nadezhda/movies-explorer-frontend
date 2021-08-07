import React from 'react';
import './MoviesCardList.css';
// import Preloader from "../Preloader/Preloader";
import MoviesCard from '../MoviesCard/MoviesCard';
import posterPath from '../../images/movie-poster.jpg';

class MoviesCardList extends React.Component {

  render() {
    return (
      <section className="card-list">
        {/* <Preloader /> */}
        <ul className="cards">
          <MoviesCard
            saved={true}
            link={posterPath}
          />
          <MoviesCard
            saved={true}
            link={posterPath}
          />
          <MoviesCard
            saved={false}
            link={posterPath}
          />
          <MoviesCard
            saved={false}
            link={posterPath}
          />
          <MoviesCard
            saved={false}
            link={posterPath}
          />
          <MoviesCard
            saved={true}
            link={posterPath}
          />
          <MoviesCard
            saved={true}
            link={posterPath}
          />
          <MoviesCard
            saved={false}
            link={posterPath}
          />
          <MoviesCard
            saved={false}
            link={posterPath}
          />
          <MoviesCard
            saved={false}
            link={posterPath}
          />
          <MoviesCard
            saved={true}
            link={posterPath}
          />
          <MoviesCard
            saved={false}
            link={posterPath}
          />
        </ul>
      </section>
    );
  }
}

export default MoviesCardList;
