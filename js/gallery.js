//  отрисовка миниатюр
import { generatesObject } from './data';

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


export { photosList };
