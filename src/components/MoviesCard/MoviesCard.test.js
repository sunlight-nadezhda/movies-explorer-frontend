import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import MoviesCard from "./MoviesCard";

const film = {
  trailerLink: 'https://www.youtube.com/watch?v=UXcqcdYABFw',
  nameRU: '«Роллинг Стоунз» в изгнании',
  duration: 61,
  image: '/uploads/stones_in_exile_b2f1b8f4b7.jpeg'
};
let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with prop film", () => {
  act(() => {
    render(<MoviesCard film={film} />, container);
  });

  const cardLink = container.querySelector(".card__link");
  const cardName = container.querySelector(".card__name");
  const cardDuration = container.querySelector(".card__duration");
  const cardImage = container.querySelector(".card__image");
  const button = container.querySelector("button");

  expect(cardLink.getAttribute('href')).toBe(film.trailerLink);
  expect(cardName.textContent).toBe(film.nameRU);
  expect(cardDuration.textContent).toBe(film.duration + ' минут');
  expect(cardImage.getAttribute('src')).toBe('https://api.nomoreparties.co' + film.image);
  expect(button.getAttribute('class')).toBe('card__button');
  expect(button.textContent).toBe('Сохранить');
});

it("renders with different props", () => {
  act(() => {
    render(<MoviesCard film={film} isFilmSaved={true} />, container);
  });

  const button = container.querySelector("button");
  expect(button.getAttribute('class')).toBe('card__button card__button_saved');
  expect(button.textContent).toBe('');

  act(() => {
    render(<MoviesCard film={film} isFilmSaved={true} isSavedMovies={true} />, container);
  });
  expect(button.getAttribute('class')).toBe('card__button card__button_delete');
});
