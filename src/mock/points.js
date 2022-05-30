import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { BASE_PRICE, DESTINATIONS, TYPES } from '../const.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax.js';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
dayjs.extend(minMax);

const generateBasePrice = () => getRandomArrayElement(BASE_PRICE);

const generateDestination = () => getRandomArrayElement(DESTINATIONS);

const generateType = () => getRandomArrayElement(TYPES);

export const generatePoint = () => {
  const typePoint = generateType();
  return {
    basePrice: generateBasePrice(),
    dateFrom: `2022-05-${getRandomInteger(15, 20)}T0${getRandomInteger(1, 3)}:16:54.401Z`,
    dateTo: `2022-05-${getRandomInteger(20, 25)}T0${getRandomInteger(3, 5)}:${getRandomInteger(17, 59)}:54.401Z`,
    destination: generateDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    type: typePoint,
    offers: [1]
  };
};
