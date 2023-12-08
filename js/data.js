import { loadPhotos } from './api.js';
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
    const photos = await loadPhotos();
    return photos;
  } catch (error) {
    showErrorMessage();
  }
};

const allPhotos = await bootstrap();
let filteredPhotos = initGalleryFilters(allPhotos, 'default');

const rePaintDefault = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((item) => item.remove());
  const elements = initGalleryFilters(allPhotos, 'default');
  const imageFilterButtonActive = filterForm.querySelector('.img-filters__button--active');
  imageFilterButtonActive.classList.remove('img-filters__button--active');
  defaultButton.classList.add('img-filters__button--active');
  renderPhotos(elements);


  const photosList = document.querySelector('.pictures');
  const miniPhoto = photosList.querySelectorAll('.picture');

  openPhoto(miniPhoto);


};
const rePaintRandom = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((item) => item.remove());
  const elements = initGalleryFilters(allPhotos, 'random');
  const imageFilterButtonActive = filterForm.querySelector('.img-filters__button--active');
  imageFilterButtonActive.classList.remove('img-filters__button--active');
  randomButton.classList.add('img-filters__button--active');
  renderPhotos(elements);
  const photosList = document.querySelector('.pictures');
  const miniPhoto = photosList.querySelectorAll('.picture');
  openPhoto(miniPhoto);
  filteredPhotos = initGalleryFilters(allPhotos, 'random');
};
const rePaintDiscussed = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((item) => item.remove());
  const elements = initGalleryFilters(allPhotos, 'discussed');
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
