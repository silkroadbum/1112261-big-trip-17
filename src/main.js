import FilterView from './view/filter-view.js';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { generateDestinationData } from './mock/destination.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteEventElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationData = generateDestinationData();
const boardPresenter = new BoardPresenter(siteEventElement, pointsModel, destinationData);


render(new FilterView(), siteFilterElement);

boardPresenter.init();
