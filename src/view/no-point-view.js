import { createElement } from '../render.js';

const createNoPointTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoPointView {
  #lement = null;

  get template() {
    return createNoPointTemplate();
  }

  get element() {
    if (!this.#lement) {
      this.#lement = createElement(this.template);
    }

    return this.#lement;
  }

  removeElement() {
    this.#lement = null;
  }
}
