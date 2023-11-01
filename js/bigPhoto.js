import { photosList } from './gallery';


const bigPhoto = document.querySelector('.big-picture');
const miniPhoto = photosList.querySelectorAll('.picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const bigPhotoSocial = document.querySelector('.big-picture__social');
const socialCommentCount = document.querySelector('.social__comment-count');


const openBigPhoto = () => {
  bigPhoto.classList.remove('hidden');
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
};

miniPhoto.forEach((photosList) => {
  photosList.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPhoto();
    bigPhoto.querySelector('img').src = photosList.querySelector('.picture__img').src;
    bigPhotoSocial.querySelector('.likes-count').textContent = photosList.querySelector('.picture__likes').textContent;
    socialCommentCount.querySelector('.social__comment-shown-count').textContent = 2; //не понял что сюда надо вставить
    socialCommentCount.querySelector('.social__comment-total-count').textContent = photosList.querySelector('.picture__comments').textContent;

  });
});

closeButton.addEventListener('click', () => {
  closeBigPhoto();
});


export { miniPhoto };
