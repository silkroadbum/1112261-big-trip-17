import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import FormEditView from '../view/form-edit-view.js';
import WaypointView from '../view/waypoint-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  #boardComponent = new BoardView();

  #boardContainer = null;
  #pointsModel = null;

  #boardPoints = [];

  init = (boardContainer, pointsModel, destination) => {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    render(new SortView(), this.#boardContainer);
    render(this.#boardComponent, this.#boardContainer);
    render(new FormEditView(this.#boardPoints[0], destination), this.#boardComponent.element);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      render(new WaypointView(this.#boardPoints[i]), this.#boardComponent.element);
    }
  };
}
