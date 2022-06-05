import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import { allDestinationData } from './mock/destination.js';
import { render, RenderPosition } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './api/points-api-service.js';
import OffersApiService from './api/offers-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteEventElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main__trip-controls');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteEventElement, pointsModel, allDestinationData, filterModel, offersModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();


const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

filterPresenter.init();
boardPresenter.init();
offersModel.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteHeaderElement, RenderPosition.AFTEREND);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
