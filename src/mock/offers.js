import { getRandomInteger } from '../utils/common.js';

const typesOffer = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: getRandomInteger(0, 100)
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 3,
        title: 'Add luggage',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 4,
        title: 'Add luggage',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 5,
        title: 'Add breakfast',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 6,
        title: 'Add luggage',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 7,
        title: 'Rent a car',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 8,
        title: 'Switch to comfort',
        price: getRandomInteger(0, 100)
      },
      {
        id: 9,
        title: 'Add luggage',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 10,
        title: 'Book tickets',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 11,
        title: 'Wi-Fi',
        price: getRandomInteger(0, 100)
      }
    ]
  },
];

export { typesOffer };
