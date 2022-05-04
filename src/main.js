import FilterView from './view/filter-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { generateDestinationData } from './mock/destination.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteEventElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter();
const destinationData = generateDestinationData();

render(new FilterView(), siteFilterElement);

boardPresenter.init(siteEventElement, pointsModel, destinationData);
