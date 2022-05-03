import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

//Функция генерации случайных чисел из диапазона
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция получения случайного числа из массива
const getRandomArrayElement = (elements) => (elements[getRandomInteger(0, elements.length - 1)]);

const humanizePointDate = (date) => dayjs(date).format('HH:mm');
const humanizeEventDate = (date) => dayjs(date).format('MMM D');

//Функция возвращающая разницу между датой начала и окончания точки маршрута
const getDurationDates = (dateStart, dateFinish) => {
  const diff = dateFinish.diff(dateStart);
  const daysCount = dayjs.duration(diff).format('DD');
  const hoursCount = dayjs.duration(diff).format('HH');
  const minutesCount = dayjs.duration(diff).format('mm');

  if (daysCount > 0) {
    return `${daysCount}D ${hoursCount}H ${minutesCount}M`;
  }
  if (hoursCount > 0) {
    return `${hoursCount}H ${minutesCount}M`;
  } else {
    return `${minutesCount}M`;
  }
};

export { getRandomInteger, getRandomArrayElement, humanizePointDate, humanizeEventDate, getDurationDates };
