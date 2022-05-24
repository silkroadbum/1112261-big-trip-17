// import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
// import { DESTINATIONS, DESCRIPTION_OF_DESTINATION, NUM_OF_POINTS } from '../const.js';

// const generateDestination = () => getRandomArrayElement(DESTINATIONS);
// const generateDescription = () => getRandomArrayElement(DESCRIPTION_OF_DESTINATION);
// const generatePictures = () => ({
//   src: `http://picsum.photos/248/152?r=${getRandomInteger(0, NUM_OF_POINTS)}`,
//   description: generateDescription()
// });


// export const generateDestinationData = () => ({
//   description: generateDescription(),
//   name: generateDestination(),
//   pictures: generatePictures()
// });

const allDestinationData = [
  {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=1',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    description: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=2',
        description: 'Amsterdam parliament building'
      }
    ]
  },
  {
    description: 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=3',
        description: 'Geneva parliament building'
      },
      {
        src: 'http://picsum.photos/300/200?r=4',
        description: 'Geneva parliament building'
      }
    ]
  },
];

export { allDestinationData };
