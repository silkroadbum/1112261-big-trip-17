import { getRandomInteger } from '../util.js';

const offers = {
  'taxi': [
    {
      'id': 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1)),
    }, {
      'id': 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }
  ],
  'check-in': [],
  'train': [
    {
      'id': 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }, {
      'id': 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }, {
      'id': 3,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }
  ],
  'ship': [
    {
      'id': 1,
      'title': 'Travel by train',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }
  ],
  'drive': [
    {
      'id': 1,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }, {
      'id': 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }, {
      'id': 3,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }
  ],
  'flight': [
    {
      'id': 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }, {
      'id': 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }, {
      'id': 3,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }, {
      'id': 4,
      'title': 'Add luggage',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }
  ],
  'bus': [
    {
      'id': 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }, {
      'id': 2,
      'title': 'Add meal',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }
  ],
  'sightseeing': [
    {
      'id': 1,
      'title': 'Add meal',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }
  ],
  'restaurant': [
    {
      'id': 1,
      'title': 'Choose seats',
      'price': getRandomInteger(0, 150),
      'selected': Boolean(getRandomInteger(0, 1))
    }
  ]
};

export { offers };
