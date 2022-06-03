import { remove, render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import { SORT_TYPE, UpdateType, UserAction, FILTER_TYPE } from '../const.js';
import { sortPointByPrice, sortByTime, sortPointUp } from '../utils/point.js';
import { filter } from '../utils/filter.js';

export default class BoardPresenter {
  #boardComponent = new BoardView(); // создаем экземпляр пустого списка точек маршрута
  #loadingComponent = new LoadingView();

  #noPointComponent = null;
  #sortComponent = null;
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #destination = null;
  #offers = null;
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SORT_TYPE.DEFAULT;
  #filterType = FILTER_TYPE.EVERYTHING;
  #isLoading = true;

  constructor(boardContainer, pointsModel, destination, offers, filterModel) {
    this.#boardContainer = boardContainer;
    this.#offers = offers;
    this.#destination = destination;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#boardComponent.element, this.#destination, this.#handleViewAction, this.#offers);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const tasks = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](tasks);

    switch (this.#currentSortType) {
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortByTime);
      case SORT_TYPE.DEFAULT:
        return filteredPoints.sort(sortPointUp);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SORT_TYPE.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MINOR, FILTER_TYPE.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
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
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {

    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoPointList = () => {
    this.#noPointComponent = new NoPointView(this.#filterType);
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardComponent.element, this.#destination, this.#handleViewAction, this.#handleModeChange, this.#offers);

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DEFAULT;
    }
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPointList();
      return;
    }

    this.#renderSort();
    this.#renderPoints(points);
  };
}
