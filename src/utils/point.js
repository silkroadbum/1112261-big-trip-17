import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

const humanizePointDate = (date) => dayjs(date).format('HH:mm');
const humanizeEventDate = (date) => dayjs(date).format('MMM D');
const humanizePointDateAndTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');

//Функция возвращающая разницу между датой начала и окончания точки маршрута
const getDurationDates = (dateStart, dateFinish) => {
  const diff = dayjs(dateFinish).diff(dateStart);
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

//Сравнение цены
const comparePrice = (priceA, priceB) => {
  if (priceA > priceB) {
    return -1;
  }
  if (priceA < priceB) {
    return 1;
  }
  return 0;
};

//Функция сортировки по цене для передачи в метод sort
const sortPointByPrice = (pointA, pointB) => comparePrice(pointA.basePrice, pointB.basePrice);

//Сравнение времени
const compareTime = (timeA, timeB) => {
  if (timeA > timeB) {
    return 1;
  }
  if (timeA < timeB) {
    return -1;
  }
  return 0;
};

//Функция сортировки по времени для передачи в метод sort
const sortByTime = (pointA, pointB) => {
  const timeA = pointA.dateFrom.diff(pointA.dateTo);
  const timeB = pointB.dateFrom.diff(pointB.dateTo);
  return compareTime(timeA, timeB);
};

const isPointPast = (date) => dayjs().isAfter(date, 'day');
const isPointFuture = (date) => dayjs().isBefore(date, 'day');
const isPointCurrent = (date) => dayjs().isSame(date, 'day');

export { humanizePointDate, humanizeEventDate, getDurationDates, sortPointByPrice, sortByTime, isPointPast, isPointFuture, isPointCurrent, humanizePointDateAndTime };
