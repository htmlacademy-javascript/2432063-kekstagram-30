const object = 4; //количество объектов

// функция случайного числа
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//заполняем массив обектами
const createObject = (x, ID) => ({
  id: ID+1,
  url: 'photos/' + (ID+1) + '.jpg',
  description: 'булочки',
  likes:  getRandomInteger(15, 200),
  comments: 'ТУТ',

});
//Генерирует объекты
const generatesObject = Array.from({length: object}, createObject);

console.log(generatesObject);
