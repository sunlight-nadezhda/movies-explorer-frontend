import { constants } from '../utils/constants';

const { durationBeatFilm } = constants;

export const filterFilms = (collection, keyword, isBeatFilm) => {
  if (isBeatFilm) collection = filterBeatFilms(collection);
  return filterByKeyword(collection, keyword);
};

export const filterByKeyword = (collection, keyword) => collection.filter(({ nameRU }) =>
  nameRU.toLowerCase().includes(keyword.toLowerCase()));

export const filterBeatFilms = (collection) => collection.filter(({ duration }) =>
    duration <= durationBeatFilm);
