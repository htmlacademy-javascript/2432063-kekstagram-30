const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MASSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_COUNT = 4; //количество объектов

// функция случайного числа
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//создает комментарий
const createСomment = (undefined, id) => ({
  id: id + 1,
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(MASSAGES),
  name: getRandomArrayElement(NAMES),
});

//создает объект
const createObject = (undefined, id) => ({
  id: id + 1,
  url: `photos/${ id + 1 }.jpg`,
  description: 'булочки',
  likes:  getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0,30)}, createСomment),
});

//Генерирует массив с объектами
const generatesObject = Array.from({length: PHOTO_COUNT}, createObject);

console.log(generatesObject);
