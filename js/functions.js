
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

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
const generatesObject = Array.from({length: PHOTO_COUNT}, (_, id) => createObject(id));


const photoTemplate = document.querySelector('#picture').content;
const photosList = document.querySelector('.pictures');

const createPhotos = generatesObject; // массив фотографий

const createListPictures = document.createDocumentFragment();

// заполняет созданный элемент
createPhotos.forEach(({url, description, likes, comments}) => {
  const element = photoTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;
  createListPictures.appendChild(element);
});

photosList.appendChild(createListPictures);


const calculateTimeInMinutes = (time) => {
  const [hours, minutes] = time.split(':').map((item) => Number(item));
  return hours * 60 + minutes;
};


const showTime = (beginingWorkDay, endWorkDay, startMeeting, meetingInMinutes) => {
  const beginingWorkDayMinutes = calculateTimeInMinutes(beginingWorkDay);
  const endWorkDayMinutes = calculateTimeInMinutes(endWorkDay);
  const startMeetingMinutes = calculateTimeInMinutes(startMeeting);
  return (endWorkDayMinutes - startMeetingMinutes >= meetingInMinutes && beginingWorkDayMinutes <= startMeetingMinutes);
} ;


const timeValue = showTime ('14:00', '17:30', '14:00', 90);
console.log(timeValue);
