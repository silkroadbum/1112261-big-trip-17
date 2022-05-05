import { getRandomInteger, getRandomArrayElement } from '../util.js';
import { DESTINATIONS, DESCRIPTION_OF_DESTINATION, NUM_OF_POINTS } from '../const.js';

const generateDestination = () => getRandomArrayElement(DESTINATIONS);
const generateDescription = () => getRandomArrayElement(DESCRIPTION_OF_DESTINATION);
const generatePicutres = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(0, NUM_OF_POINTS)}`,
  descripton: generateDescription()
});


export const generateDestinationData = () => ({
  descripton: generateDescription(),
  name: generateDestination(),
  pictures: generatePicutres()
});
