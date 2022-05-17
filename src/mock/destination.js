import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { DESTINATIONS, DESCRIPTION_OF_DESTINATION, NUM_OF_POINTS } from '../const.js';

const generateDestination = () => getRandomArrayElement(DESTINATIONS);
const generateDescription = () => getRandomArrayElement(DESCRIPTION_OF_DESTINATION);
const generatePictures = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(0, NUM_OF_POINTS)}`,
  description: generateDescription()
});


export const generateDestinationData = () => ({
  description: generateDescription(),
  name: generateDestination(),
  pictures: generatePictures()
});
