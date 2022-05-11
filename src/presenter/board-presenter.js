import { render } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import FormEditView from '../view/form-edit-view.js';
import WaypointView from '../view/waypoint-view.js';
import NoPointView from '../view/no-point-view.js';

export default class BoardPresenter {
  #boardComponent = new BoardView();

  #boardContainer = null;
  #pointsModel = null;
  #destination = null;
  #boardPoints = [];

  constructor(boardContainer, pointsModel, destination) {
    this.#boardContainer = boardContainer;
    this.#destination = destination;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
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

    pointComponent.setClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#boardComponent.element);
  };

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), this.#boardContainer);
    } else {
      render(new SortView(), this.#boardContainer);
      render(this.#boardComponent, this.#boardContainer);

      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  };
}
