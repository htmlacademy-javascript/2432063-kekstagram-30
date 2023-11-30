import { loadPictures } from './api.js';
import { debounce, showErrorMessage } from './util.js';
import { initGalleryFilters } from './filter.js';
import { renderPhotos } from './gallery.js';
import { openPhoto } from './big-photo.js';

const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');


const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    return pictures;
  } catch (error) {
    showErrorMessage();
  }
};

const photos = await bootstrap();
let filteredPhotos = initGalleryFilters(photos, 'default');

const rePaintDefault = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  const elements = initGalleryFilters(photos, 'default');
  const imageFilterButtonActive = filterForm.querySelector('.img-filters__button--active');
  imageFilterButtonActive.classList.remove('img-filters__button--active');
  defaultButton.classList.add('img-filters__button--active');
  renderPhotos(elements);


  const photosList = document.querySelector('.pictures');
  const miniPhoto = photosList.querySelectorAll('.picture');

  openPhoto(miniPhoto);


};
const rePaintRandom = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  const elements = initGalleryFilters(photos, 'random');
  const imageFilterButtonActive = filterForm.querySelector('.img-filters__button--active');
  imageFilterButtonActive.classList.remove('img-filters__button--active');
  randomButton.classList.add('img-filters__button--active');
  renderPhotos(elements);
  const photosList = document.querySelector('.pictures');
  const miniPhoto = photosList.querySelectorAll('.picture');
  openPhoto(miniPhoto);
  filteredPhotos = initGalleryFilters(photos, 'random');
};
const rePaintDiscussed = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  const elements = initGalleryFilters(photos, 'discussed');
  const imageFilterButtonActive = filterForm.querySelector('.img-filters__button--active');
  imageFilterButtonActive.classList.remove('img-filters__button--active');
  discussedButton.classList.add('img-filters__button--active');
  renderPhotos(elements);

  const photosList = document.querySelector('.pictures');
  const miniPhoto = photosList.querySelectorAll('.picture');
  openPhoto(miniPhoto);
};

const debounceDefault = debounce(rePaintDefault);
const debounceRandom = debounce(rePaintRandom);
const debounceDiscussed = debounce(rePaintDiscussed);


const checkDataPhotos = () => {
  if (filteredPhotos === undefined) {
    return [];
  }
  return filteredPhotos;
};
renderPhotos(checkDataPhotos());


defaultButton.addEventListener('click', () => {
  debounceDefault();

});

randomButton.addEventListener('click', () => {
  debounceRandom();

});


discussedButton.addEventListener('click', () => {
  debounceDiscussed();
});

const photo = [...filteredPhotos];

export {photo};
