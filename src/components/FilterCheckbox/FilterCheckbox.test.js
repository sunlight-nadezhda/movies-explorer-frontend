import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import FilterCheckbox from "./FilterCheckbox";

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

it("renders text", () => {
  act(() => {
    const onChange = jest.fn();
    render(<FilterCheckbox onChange={onChange} value={false} />, container);
  });
  expect(container.textContent).toBe("Короткометражки");
});

it("changes value when clicked", () => {
  const onChange = jest.fn();
  const value = false;
  act(() => {
    render(<FilterCheckbox onChange={onChange} value={value} />, container);
  });

  // получаем элемент toggle и кликаем на него
  const toggle = container.querySelector(".filter__input");
  const filter = container.querySelector(".filter__label");

  expect(toggle.checked).toBeFalsy();

  act(() => {
    filter.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0, composed: true }));
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(!value);
});
