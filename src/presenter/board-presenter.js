import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import FormEditView from '../view/form-edit-view.js';
import WaypointView from '../view/waypoint-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  #boardComponent = new BoardView();

  #boardContainer = null;
  #pointsModel = null;
  #destination = null;
  #boardPoints = [];

  init = (boardContainer, pointsModel, destination) => {
    this.#boardContainer = boardContainer;
    this.#destination = destination;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    render(new SortView(), this.#boardContainer);
    render(this.#boardComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new WaypointView(point);
    const pointEditComponent = new FormEditView(point, this.#destination);

    const replacePointToForm = () => {
      this.#boardComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#boardComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#boardComponent.element);
  };
}
