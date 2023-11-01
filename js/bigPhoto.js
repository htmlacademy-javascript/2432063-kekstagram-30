import { photosList } from './gallery';


const bigPhoto = document.querySelector('.big-picture');
const miniPhoto = photosList.querySelectorAll('.picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');


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

  });
});

closeButton.addEventListener('click', () => {
  closeBigPhoto();
});


export { miniPhoto };
