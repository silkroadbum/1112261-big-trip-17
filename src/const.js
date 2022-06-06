const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const AUTHORIZATION = 'Basic h2oj7mnk99';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
const SortType = {
  DEFAULT: 'DEFAULT',
  PRICE: 'PRICE',
  TIME: 'TIME',
};
const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};
const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
const BLANK_POINT = {
  basePrice: '',
  dateFrom: null,
  dateTo: null,
  destination: {
    description: ' ',
    name: ' Surgut',
    pictures: [],
  },
  isFavorite: false,
  offers: [],
  type: 'taxi',
};
const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export { TYPES, Mode, SortType, FilterType, UserAction, UpdateType, BLANK_POINT, Method, AUTHORIZATION, END_POINT };
