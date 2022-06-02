import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate, humanizeEventDate, getDurationDates } from '../utils/point.js';
import he from 'he';

const renderSelectedOffers = (point, offers) => {
  const pointTypeOffer = offers.find((offer) => offer.type === point.type);

  return pointTypeOffer.offers.map((offer) => point.offers.includes(offer.id) ?
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>` : '').join('');
};

const createSelectedOffersTemplate = (point, offers) => `<ul class="event__selected-offers">${renderSelectedOffers(point, offers)}</ul>`;

const createWaypointTemplate = (point, allOffers = []) => {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, type } = point;

  const formatedDateFrom = humanizePointDate(dateFrom);
  const formatedDateTo = humanizePointDate(dateTo);
  const eventDate = humanizeEventDate(dateFrom);

  const selectedOffersTemplate = createSelectedOffersTemplate(point, allOffers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${eventDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type}">
        </div>
        <h3 class="event__title">${type} ${he.encode(destination)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${formatedDateFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${formatedDateTo}</time>
          </p>
          <p class="event__duration">${getDurationDates(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        ${selectedOffersTemplate}
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class WaypointView extends AbstractView {
  #point = null;

  constructor(point, allOffers) {
    super();
    this.#point = point;
    this.allOffers = allOffers;
  }

  get template() {
    return createWaypointTemplate(this.#point, this.allOffers);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
