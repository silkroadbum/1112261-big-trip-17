import { render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SORT_TYPE } from '../const.js';
import { sortPointByPrice, sortByTime } from '../utils/point.js';

export default class BoardPresenter {
  #boardComponent = new BoardView(); // создаем экземпляр пустого списка точек маршрута
  #sortComponent = new SortView(); //создаем экземпляр вьюшки сортировки
  #noPointComponent = new NoPointView(); //Создаем экземпляр вьюшки вывода сообщения при отсутствии точек маршрута

  #boardContainer = null;
  #pointsModel = null;
  #destination = null;
  #boardPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedBoardPoints = [];

  constructor(boardContainer, pointsModel, destination) {
    this.#boardContainer = boardContainer;
    this.#destination = destination;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.PRICE:
        this.#boardPoints.sort(sortPointByPrice);
        break;
      case SORT_TYPE.TIME:
        this.#boardPoints.sort(sortByTime);
        break;
      case SORT_TYPE.DEFAULT:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoPointList = () => {
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointList = () => {
    render(this.#boardComponent, this.#boardContainer);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardComponent.element, this.#destination, this.#handlePointChange, this.#handleModeChange);

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
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
