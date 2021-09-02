import { constants } from '../utils/constants';

const { durationBeatFilm } = constants;

export const getFilteredFilms = (collection, keyWord, isBeatFilm) => collection
  .filter(({ nameRU, duration }) => {
    if (isBeatFilm && duration > durationBeatFilm) return false;
    return nameRU.toLowerCase().includes(keyWord.toLowerCase());
  });
