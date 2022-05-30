const NUM_OF_POINTS = 12;
const BASE_PRICE = [20, 50, 160, 180, 600];
const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva'];
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
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
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};
const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { NUM_OF_POINTS, BASE_PRICE, DESTINATIONS, TYPES, DESCRIPTION_OF_DESTINATION, MODE, SORT_TYPE, FILTER_TYPE, UserAction, UpdateType };
