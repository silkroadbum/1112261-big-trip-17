import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

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

export { humanizePointDate, humanizeEventDate, getDurationDates };
