import { loadPictures } from './api.js';
import { debounce, showErrorMessage } from './util.js';
import { initGalleryFilters } from './filter.js';
import { renderPhotos } from './gallery.js';
import { openBigPhoto, qqq } from './bigPhoto.js';

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


const rePaintDefault = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  const elements = initGalleryFilters(photos, 'default');
  const imageFilterButtonActive = filterForm.querySelector('.img-filters__button--active');
  imageFilterButtonActive.classList.remove('img-filters__button--active');
  defaultButton.classList.add('img-filters__button--active');
  renderPhotos(elements);
  console.log(elements);
  const photosList = document.querySelector('.pictures');
  const miniPhoto = photosList.querySelectorAll('.picture');
  qqq(miniPhoto);
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
  qqq(miniPhoto);
};
const rePaintDiscussed = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  const elements = initGalleryFilters(photos, 'discussed');
  const imageFilterButtonActive = filterForm.querySelector('.img-filters__button--active');
  imageFilterButtonActive.classList.remove('img-filters__button--active');
  discussedButton.classList.add('img-filters__button--active');
  renderPhotos(elements);
};

const debounceDefault = debounce(rePaintDefault);
const debounceRandom = debounce(rePaintRandom);
const debounceDiscussed = debounce(rePaintDiscussed);


const filteredPhotos = initGalleryFilters(photos, 'default');
const filteredPhotos2 = initGalleryFilters(photos, 'random');
renderPhotos(filteredPhotos);
renderPhotos(filteredPhotos2);

defaultButton.addEventListener('click', () => {
  debounceDefault();
});

randomButton.addEventListener('click', () => {
  debounceRandom();
});


discussedButton.addEventListener('click', () => {
  debounceDiscussed();
});

export {filteredPhotos};
