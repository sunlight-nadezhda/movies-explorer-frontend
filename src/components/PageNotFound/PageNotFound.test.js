import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import NotFound from "./PageNotFound";

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

it("renders component", () => {
  act(() => {
    render(<NotFound />, container);
  });

  const title = container.querySelector(".not-found__title");
  const text = container.querySelector(".not-found__text");
  const button = container.querySelector(".not-found__button-back");

  expect(title.textContent).toBe("404");
  expect(text.textContent).toBe("Страница не найдена");
  expect(button.textContent).toBe("Назад");
});
