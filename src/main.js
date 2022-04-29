import FilterView from './view/filter-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteEventElement = siteMainElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();

render(new FilterView(), siteFilterElement);

boardPresenter.init(siteEventElement);
