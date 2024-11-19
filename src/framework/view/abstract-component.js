import { createElement } from "../render.js";

export class AbstractComponent {
  #element = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error("Can't instantiate AbstractComponent, only concrete one.");
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error("Abstract method not implemented: get template");
  }

  // Метод для обновления существующего элемента
  updateElement() {
    const newElement = createElement(this.template);
    this.#element.replaceWith(newElement);
    this.#element = newElement;
  }

  removeElement() {
    if (this.#element) {
      this.#element.remove();
      this.#element = null;
    }
  }
}

