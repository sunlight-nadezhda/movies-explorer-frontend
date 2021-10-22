import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import More from "./More";

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

it("renders component More", () => {
  act(() => {
    render(<More displayBlock={false} />, container);
  });
  const section = container.querySelector(".more");
  const button = container.querySelector(".more__button");
  expect(section.getAttribute('class')).toEqual('more hide-block');
  expect(button.textContent).toBe("Ещё");
});

it("renders component with hide section More", () => {
  act(() => {
    render(<More displayBlock={true} />, container);
  });

  const section = container.querySelector(".more");
  expect(section.getAttribute('class')).toEqual('more show-more');
});
