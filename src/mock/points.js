import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { BASE_PRICE, DESTINATIONS, TYPES } from '../const.js';
import { typesOffer } from './offers.js';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax.js';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
dayjs.extend(minMax);


const findPointTypeOffer = (arrayOffers, type) => {
  const pointTypeOffer = arrayOffers.find((offer) => offer.type === type);
  return pointTypeOffer;
};

const generateBasePrice = () => getRandomArrayElement(BASE_PRICE);

const generateDestination = () => getRandomArrayElement(DESTINATIONS);

const generateType = () => getRandomArrayElement(TYPES);

const generateDate = () => {
  const maxDaysGap = 2;
  const maxTimeGap = 5;
  const firstDayGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const secondDayGap = getRandomInteger(firstDayGap, maxDaysGap);
  return {
    dateFrom: dayjs.utc().add(firstDayGap, 'day').add(getRandomInteger(0, maxTimeGap), 'minute').add(getRandomInteger(0, maxTimeGap), 'hour'),
    dateTo: dayjs.utc().add(secondDayGap, 'day').add(getRandomInteger(0, maxTimeGap), 'minute').add(getRandomInteger(0, maxTimeGap), 'hour'),
  };
};

export const generatePoint = () => {
  const typePoint = generateType();
  return {
    basePrice: generateBasePrice(),
    dateFrom: dayjs.min(dayjs(), generateDate().dateFrom, generateDate().dateTo),
    dateTo: dayjs.max(dayjs(), generateDate().dateFrom, generateDate().dateTo),
    destination: generateDestination(),
    id: '0',
    isFavorite: Boolean(getRandomInteger(0, 1)),
    type: typePoint,
    offers: findPointTypeOffer(typesOffer, typePoint)
  };
};
