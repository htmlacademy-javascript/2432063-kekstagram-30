const names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const photoCount = 4; //количество объектов

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
const createСomment = (x, ID) => ({
  id: ID+1,
  avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

//Генерирует массив с комментариями
const generatesСomments = Array.from({length: getRandomInteger(0,30)}, createСomment);


//создает обектами
const createObject = (x, ID) => ({
  id: ID+1,
  url: 'photos/' + (ID+1) + '.jpg',
  description: 'булочки',
  likes:  getRandomInteger(15, 200),
  comments: generatesСomments,
});

//Генерирует массив с объектами
const generatesObject = Array.from({length: photoCount}, createObject);

console.log(generatesObject);







