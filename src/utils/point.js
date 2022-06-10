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

//Сравнение точек
const comparePoint = (pointA, pointB) => {
  if (pointA > pointB) {
    return -1;
  }
  if (pointA < pointB) {
    return 1;
  }
  return 0;
};

//Функция сортировки по цене для передачи в метод sort
const sortPointByPrice = (pointA, pointB) => comparePoint(pointA.basePrice, pointB.basePrice);

//Функция сортировки по времени для передачи в метод sort
const sortByTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo));
  const timeB = dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
  return comparePoint(timeB, timeA);
};
//Функция сортировки по дате начала точки маршрута (дефолтная сортировка)
const sortPointUp = (taskA, taskB) => dayjs(taskA.dateFrom).diff(dayjs(taskB.dateFrom));

const isPointPast = (date) => dayjs().isAfter(date, 'minute');
const isPointFuture = (date) => dayjs().isBefore(date, 'minute');
const isPointCurrent = (date) => dayjs().isSame(date, 'minute');

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { humanizePointDate, humanizeEventDate, getDurationDates, sortPointByPrice, sortByTime, isPointPast, isPointFuture, isPointCurrent, humanizePointDateAndTime, isDatesEqual, sortPointUp, isEscapeKey };
