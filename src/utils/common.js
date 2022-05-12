//Функция генерации случайных чисел из диапазона
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция получения случайного числа из массива
const getRandomArrayElement = (elements) => (elements[getRandomInteger(0, elements.length - 1)]);

export { getRandomInteger, getRandomArrayElement };
