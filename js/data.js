import {getRandomInteger} from './util.js';

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

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_COUNT = 25; //количество объектов


//случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//создает комментарий
const createСomment = (id) => ({
  id: id + 1,
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

//создает объект
const createObject = (id) => ({
  id: id + 1,
  url: `photos/${ id + 1 }.jpg`,
  description: 'булочки',
  likes:  getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0,30)}, (_, id) => createСomment(id))
});

//Генерирует массив с объектами
const generatesObject = Array.from({length: PHOTO_COUNT}, (_, id) => createObject(id)););

export {generatesObject};
