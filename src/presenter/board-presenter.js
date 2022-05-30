import { render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { SORT_TYPE, UpdateType, UserAction } from '../const.js';
import { sortPointByPrice, sortByTime } from '../utils/point.js';

export default class BoardPresenter {
  #boardComponent = new BoardView(); // создаем экземпляр пустого списка точек маршрута
  #sortComponent = new SortView(); //создаем экземпляр вьюшки сортировки
  #noPointComponent = new NoPointView(); //Создаем экземпляр вьюшки вывода сообщения при отсутствии точек маршрута

  #boardContainer = null;
  #pointsModel = null;
  #destination = null;
  #offers = null;
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor(boardContainer, pointsModel, destination, offers) {
    this.#boardContainer = boardContainer;
    this.#offers = offers;
    this.#destination = destination;
    this.#pointsModel = pointsModel;

    this.#pointPresenter.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SORT_TYPE.PRICE:
        return [...this.#pointsModel.points].sort(sortPointByPrice);
      case SORT_TYPE.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
    }
    return this.#pointsModel.points;
  }

  init = () => {
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderPointList = () => {
    const points = this.points;
    render(this.#boardComponent, this.#boardContainer);
    this.#renderPoints(points);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardComponent.element, this.#destination, this.#handleViewAction, this.#handleModeChange, this.#offers);

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderBoard = () => {
    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPointList();
    } else {
      this.#renderSort();
      this.#renderPointList();
    }
  };
}
