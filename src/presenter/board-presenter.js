import { render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardComponent = new BoardView(); // создаем экземпляр пустого списка точек маршрута
  #sortComponent = new SortView(); //создаем экземпляр вьюшки сортировки
  #noPointComponent = new NoPointView(); //Создаем экземпляр вьюшки вывода сообщения при отсутствии точек маршрута

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

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoPointList = () => {
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = () => {
    render(this.#boardComponent, this.#boardContainer);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardComponent.element);

    pointPresenter.init(point, this.#destination);
  };

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPointList();
    } else {
      this.#renderSort();
      this.#renderPointList();
    }
  };
}
