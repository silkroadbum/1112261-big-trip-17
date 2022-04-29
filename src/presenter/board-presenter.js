import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import WaypointView from '../view/waypoint-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new FormEditView(), this.boardComponent.getElement());
    render(new FormCreateView(), this.boardComponent.getElement());

    for (let i = 0; i < pointsModel.length; i++) {
      render(new WaypointView(this.boardPoints[i]), this.boardComponent.getElement());
    }
  };
}
