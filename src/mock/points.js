import { getRandomInteger } from '../util.js';

const generateDestination = () => {
  const destinations = [
    'Amsterdam',
    'Chamonix',
    'Geneva'
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const generateOffer = () => {
  const offers = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant'
  ];

  const randomIndex = getRandomInteger(0, offers.length - 1);

  return offers[randomIndex];
};


export const generatePoint = () => ({
  'base_price': 1100,
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': generateDestination(),
  'id': '0',
  'is_favorite': false,
  'offers': generateOffer(),
  'type': 'bus'
});
