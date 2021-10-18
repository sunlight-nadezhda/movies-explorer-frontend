import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ErrorMessage from "./ErrorMessage";

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

it("renders error message with false", () => {
  act(() => {
    render(<ErrorMessage isErrorVisible={false} />, container);
  });

  const div = container.querySelector("div");
  expect(div.getAttribute('class')).toEqual('error-message error-message_hide');
});

it("renders error message with true", () => {
  act(() => {
    render(<ErrorMessage isErrorVisible={true} />, container);
  });

  const div = container.querySelector("div");
  expect(div.getAttribute('class')).toEqual('error-message error-message_show');
});
