import { photosList } from './gallery';
import { renderMessagesByIndex } from './Comment.js';
import { isEscapeKey } from './util';

const bigPhoto = document.querySelector('.big-picture');
const miniPhoto = photosList.querySelectorAll('.picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const bigPhotoSocial = document.querySelector('.big-picture__social');
const socialCommentCount = document.querySelector('.social__comment-count');


const onEscapeKeydown = () => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      bigPhoto.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

const openBigPhoto = () => {
  bigPhoto.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  onEscapeKeydown();
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
};

miniPhoto.forEach((selectedPhoto, index) => {
  selectedPhoto.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPhoto.querySelector('img').src = selectedPhoto.querySelector('.picture__img').src;
    bigPhotoSocial.querySelector('.likes-count').textContent = selectedPhoto.querySelector('.picture__likes').textContent;
    socialCommentCount.querySelector('.social__comment-shown-count').textContent = 2; //не понял что сюда надо вставить
    socialCommentCount.querySelector('.social__comment-total-count').textContent = selectedPhoto.querySelector('.picture__comments').textContent;
    bigPhotoSocial.querySelector('.social__caption').textContent = selectedPhoto.querySelector('.picture__img').alt;
    renderMessagesByIndex(index);
    openBigPhoto(index);
  });
});

closeButton.addEventListener('click', () => {
  closeBigPhoto();
});


export { miniPhoto };
