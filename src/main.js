import FilterView from './view/filter-view.js';
import { render } from './render.js';

const siteBodyElement = document.querySelector('.page-body');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');

render(new FilterView(), siteFilterElement);
