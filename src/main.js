import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { render } from './render.js';

const siteBodyElement = document.querySelector('.page-body');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteSortElement = siteBodyElement.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);
render(new SortView(), siteSortElement);
