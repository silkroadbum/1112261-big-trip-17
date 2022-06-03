const NUM_OF_POINTS = 12;
const BASE_PRICE = [20, 50, 160, 180, 600];
const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva'];
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const AUTHORIZATION = 'Basic h2oj7mnk99';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';
const DESCRIPTION_OF_DESTINATION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];
const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
const SORT_TYPE = {
  DEFAULT: 'DEFAULT',
  PRICE: 'PRICE',
  TIME: 'TIME',
};
const FILTER_TYPE = {
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
};
const BLANK_POINT = {
  basePrice: '',
  dateFrom: null,
  dateTo: null,
  destination: 'Amsterdam',
  type: 'taxi',
  offers: [],
};
const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export { NUM_OF_POINTS, BASE_PRICE, DESTINATIONS, TYPES, DESCRIPTION_OF_DESTINATION, MODE, SORT_TYPE, FILTER_TYPE, UserAction, UpdateType, BLANK_POINT, Method, AUTHORIZATION, END_POINT };
