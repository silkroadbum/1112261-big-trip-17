import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDateAndTime } from '../utils/point.js';
import { TYPES, BLANK_POINT } from '../const.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const renderPointTypes = (types, checkedType) => Object.values(types).map((type) => {
  const checked = type === checkedType ? 'checked' : '';

  return `<div class='event__type-item'>
    <input id='event-type-${type}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value=${type} ${checked}>
    <label class='event__type-label  event__type-label--${type}' for='event-type-${type}-1'>${type.charAt(0).toUpperCase()}${type.slice(1)}</label>
  </div>`;
}).join('');

const createPointTypesTemplate = (checkedType, isDisabled) => (
  `<div class='event__type-wrapper'>
    <label class='event__type  event__type-btn' for='event-type-toggle-1'>
      <span class='visually-hidden'>Choose event type</span>
      <img class='event__type-icon' width='17' height='17' src='img/icons/${checkedType}.png' alt='Event type icon'>
    </label>
    <input class='event__type-toggle  visually-hidden' id='event-type-toggle-1' type='checkbox' ${isDisabled ? 'disabled' : ''}>
    <div class='event__type-list'>
      <fieldset class='event__type-group'>
        <legend class='visually-hidden'>Event type</legend>
        ${renderPointTypes(TYPES, checkedType)}
      </fieldset>
    </div>
  </div>`
);

const renderDestinations = (allDestinations) => allDestinations.map((destination) => `<option value=${destination.name}></option>`).join('');

const createDestinationsTemplate = (type, destination, allDestinations, isDisabled) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
    <datalist id="destination-list-1">
      ${renderDestinations(allDestinations)}
    </datalist>
  </div>`
);

const renderPhotos = (allDestinations, checkedDestination) => {
  const pointDestination = allDestinations.find((destination) => destination.name === checkedDestination.name);

  return pointDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
};

const createDestinationPhotoTemplate = (allDestinations, checkedDestination) => {
  const pointDestination = allDestinations.find((destination) => destination.name === checkedDestination.name);

  return pointDestination && pointDestination.description !== '' ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${renderPhotos(allDestinations, checkedDestination)}
        </div>
      </div>
    </section>` : '';
};

const renderAvailableOffers = (checkedType, allOffers, checkedOffers, isDisabled) => {
  const pointTypeOffer = allOffers.find((offer) => offer.type === checkedType);

  if (pointTypeOffer !== undefined) {
    return pointTypeOffer.offers.map((offer) => {
      const checked = checkedOffers.includes(offer.id) ? 'checked' : '';

      return `<div class='event__offer-selector'>
        <input class='event__offer-checkbox  visually-hidden' id='event-offer-luggage-${offer.id}' type='checkbox' name='event-offer-luggage' data-offer-id=${offer.id} ${checked} ${isDisabled ? 'disabled' : ''}>
        <label class='event__offer-label' for='event-offer-luggage-${offer.id}'>
          <span class='event__offer-title'>${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class='event__offer-price'>${offer.price}</span>
        </label>
      </div>`;
    }).join('');
  }
  return '';
};

const createAvailableOffersTemplate = (checkedType, allOffers, checkedOffers, isDisabled) => {
  const pointTypeOffer = allOffers.find((offer) => offer.type === checkedType);
  if (pointTypeOffer !== undefined) {
    return pointTypeOffer.offers.length ?
      `<section class='event__section  event__section--offers'>
        <h3 class='event__section-title  event__section-title--offers'>Offers</h3>
        <div class='event__available-offers'>
          ${renderAvailableOffers(checkedType, allOffers, checkedOffers, isDisabled)}
        </div>
      </section>` : '';
  }
  return '';
};

const createFormEditTemplate = (point, destinationData, offersData) => {
  const { price, dateFrom, dateTo, checkedDestination, checkedType, checkedOffers, isDisabled, isSaving, isDeleting } = point;

  const pointTypesTemplate = createPointTypesTemplate(checkedType, isDisabled);
  const destinationaTempalte = createDestinationsTemplate(checkedType, checkedDestination, destinationData, isDisabled);
  const destinationPhotoTemplate = createDestinationPhotoTemplate(destinationData, checkedDestination);
  const offersTemplate = createAvailableOffersTemplate(checkedType, offersData, checkedOffers, isDisabled);

  const newDateFrom = dateFrom !== null ? humanizePointDateAndTime(dateFrom) : '';
  const newDateTo = dateTo !== null ? humanizePointDateAndTime(dateTo) : '';

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
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${newDateFrom}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${newDateTo}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset" ${isDeleting ? 'disabled' : ''}>
            ${isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationPhotoTemplate}
        </section>
      </form>
    </li>`
  );
};

export default class FormEditView extends AbstractStatefulView {
  #destination = null;
  #offers = null;
  #datepicker = null;

  constructor(point = BLANK_POINT, destination, offers) {
    super();
    this._state = FormEditView.parsePointToState(point);
    this.#destination = destination;
    this.#offers = offers;

    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#destination, this.#offers);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  reset = (point) => {
    this.updateElement(
      FormEditView.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormEditView.parseStateToPoint(this._state));
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormEditView.parseStateToPoint(this._state));
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
      checkedOffers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.checkedDestination.name = evt.target.value;
    this.updateElement({ checkedDestination: this._state.checkedDestination });
  };

  #offersToggleHandler = (evt) => {
    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }

    const оffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .filter((element) => element.checked)
      .map((element) => Number(element.dataset.offerId));

    this._setState({
      checkedOffers: оffers,
    });
  };

  #basePriceHandler = (evt) => {
    evt.preventDefault();
    const reg = /^(?:[1-9]\d*|\d)$/;
    this._setState({
      price: reg.test(evt.target.value) ? evt.target.value : '',
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDateFromPicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
      },
    );
  };

  #setDateToPicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#pointTypeClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#basePriceHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersToggleHandler);
    }
  };

  static parsePointToState = (point) => ({
    ...point,
    checkedType: point.type,
    checkedDestination: point.destination,
    price: point.basePrice,
    checkedOffers: point.offers,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });


  static parseStateToPoint = (state) => {
    const point = { ...state };

    if (point.checkedType !== point.type) {
      point.type = point.checkedType;
    }
    if (point.checkedDestination !== point.destination) {
      point.destination = point.checkedDestination;
    }
    point.basePrice = point.price;
    point.offers = point.checkedOffers;

    delete point.checkedType;
    delete point.checkedDestination;
    delete point.price;
    delete point.checkedOffers;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
