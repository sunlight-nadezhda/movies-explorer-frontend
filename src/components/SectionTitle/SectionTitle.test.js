import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import SectionTitle from "./SectionTitle";

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

it("renders title О проекте", () => {
  act(() => {
    render(<SectionTitle title="О проекте" />, container);
  });

  const title = container.querySelector(".section__title");
  expect(title.innerHTML).toBe("О проекте");
});

it("renders title Технологии", () => {
  act(() => {
    render(<SectionTitle title="Технологии" />, container);
  });

  const title = container.querySelector(".section__title");
  expect(title.innerHTML).toBe("Технологии");
});

it("renders title Студент", () => {
  act(() => {
    render(<SectionTitle title="Студент" />, container);
  });

  const title = container.querySelector(".section__title");
  expect(title.innerHTML).toBe("Студент");
});
