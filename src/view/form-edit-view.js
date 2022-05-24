import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPES } from '../const.js';

const BLANK_POINT = {
  type: 'taxi',
  destination: 'Amsterdam',
  dateFrom: null,
  dateTo: null,
  basePrice: null,
};

const renderPointTypes = (types, checkedType) => Object.values(types).map((type) => {
  const isChecked = type === checkedType ? 'checked' : '';

  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type} ${isChecked}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`;
}).join('');

const createPointTypesTemplate = (checkedType) => (
  `<label class="event__type  event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedType}.png" alt="Event type icon">
    </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  <div class="event__type-list">
    <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${renderPointTypes(TYPES, checkedType)}
    </fieldset>
  </div>`
);

const renderDestinations = (destanations) => destanations.map((destanation) => `<option value="${destanation.name}"></option>`).join('');

const createDestinationsTemplate = (type, destination, destinations) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${renderDestinations(destinations)}
    </datalist>
  </div>`
);

const renderPhotos = (destinations, checkedDestination) => {
  const pointDestination = destinations.find((destination) => destination.name === checkedDestination);

  return pointDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
};

const createDestinationPhotoTemplate = (destinations, checkedDestination) => {
  const pointDestination = destinations.find((destination) => destination.name === checkedDestination);

  return pointDestination && pointDestination.description !== '' ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${renderPhotos(destinations, checkedDestination)}
        </div>
      </div>
    </section>` : '';
};

const renderOffers = (checkedType, offers, checkedOffers) => {
  const pointTypeOffer = offers.find((offer) => offer.type === checkedType);

  return pointTypeOffer.offers.map((offer) => {
    const isChecked = checkedOffers.incudes(offer.id) ? 'checked' : '';

    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="event-offer-luggage" ${isChecked}>
      <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');
};

const createOffersTemplate = (checkedType, offers, checkedOffers) => {
  const pointTypeOffer = offers.find((offer) => offer.type === checkedType);

  return pointTypeOffer.offers.length ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${renderOffers(checkedType, offers, checkedOffers)}
      </div>
    </section>`: '';
};

const createFormEditTemplate = (point, destinationData) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = point;

  const pointTypesTemplate = createPointTypesTemplate(type);
  const destinationaTempalte = createDestinationsTemplate(type, destination, destinationData);
  const destinationPhotoTemplate = createDestinationPhotoTemplate(destinationData, destination);
  // const offersTemplate = createOffersTemplate(type, ??, offers);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            ${pointTypesTemplate}
          </div>
          ${destinationaTempalte}
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom.format('YY/MM/DD HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo.format('YY/MM/DD HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${destinationPhotoTemplate}
        </section>
      </form>
    </li>`
  );
};

export default class FormEditView extends AbstractStatefulView {
  #destination = null;

  constructor(point = BLANK_POINT, destination) {
    super();
    this._state = FormEditView.parsePointToState(point);
    this.#destination = destination;

    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#destination);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setClickHandler(this._callback.click);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormEditView.parseStateToPoint(this._state));
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #pointTypeClickHandler = (evt) => {
    if (!evt.target.classList.contains('event__type-label')) {
      return;
    }
    evt.preventDefault();
    this.updateElement({
      checkedType: evt.target.parentNode.querySelector('.event__type-input').value,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedDestination: evt.target.value,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-btn').addEventListener('click', this.#pointTypeClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  };

  static parsePointToState = (point) => ({
    ...point,
    checkedType: point.type,
    checkedDestination: point.destination
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    if (point.checkedType !== point.type) {
      point.type = point.checkedType;
    }
    if (point.checkedDestination !== point.destination) {
      point.destination = point.checkedDestination;
    }

    delete point.checkedType;
    delete point.checkedDestination;

    return point;
  };
}
