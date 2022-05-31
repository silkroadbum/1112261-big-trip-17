import FilterView from './view/filter-view.js';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { allDestinationData } from './mock/destination.js';
import { typesOffer } from './mock/offers.js';

const filters = [
  {
    type: 'everything',
    name: 'EVERYTHING',
    count: 0,
  }
];

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteEventElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteEventElement, pointsModel, allDestinationData, typesOffer);


render(new FilterView(filters, 'everything'), siteFilterElement);

boardPresenter.init();
