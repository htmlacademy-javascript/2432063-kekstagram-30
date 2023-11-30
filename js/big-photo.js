const LOAD_COMMENTS_PER_CLICK = 5;

import { renderMessagesByIndex } from './comment.js';
import { isEscapeKey } from './util.js';

const photosList = document.querySelector('.pictures');


const bigPhoto = document.querySelector('.big-picture');
const miniPhoto = photosList.querySelectorAll('.picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const bigPhotoSocial = document.querySelector('.big-picture__social');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

let countReanderComment = 5;

const openBigPhoto = () => {
  bigPhoto.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  countReanderComment = LOAD_COMMENTS_PER_CLICK;
};

const onEscapeKeydown = (commentsLoaderClick) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPhoto();
      socialCommentsLoader.removeEventListener('click', commentsLoaderClick);
    }
  });
};

const onClickButtonClose = (commentsLoaderClick) => {
  closeButton.addEventListener('click', () => {
    closeBigPhoto();
    socialCommentsLoader.removeEventListener('click', commentsLoaderClick);
  });
};

const openPhoto = (photosOnPage) => {
  photosOnPage.forEach((selectedPhoto, index) => {
    selectedPhoto.addEventListener('click', (evt) => {
      evt.preventDefault();
      const commentsTotalCount = Number(selectedPhoto.querySelector('.picture__comments').textContent);
      const socialCommentShownCount = socialCommentCount.querySelector('.social__comment-shown-count');
      const hideComentsLoader = () => document.querySelector('.comments-loader').classList.add('hidden');

      if (commentsTotalCount <= countReanderComment) {
        countReanderComment = commentsTotalCount;
        hideComentsLoader();
      }

      const onSocialCommentsLoaderClick = () => {

        if (commentsTotalCount <= LOAD_COMMENTS_PER_CLICK) {
          socialCommentShownCount.textContent = commentsTotalCount;


        } if (countReanderComment + LOAD_COMMENTS_PER_CLICK >= commentsTotalCount) {
          socialCommentShownCount.textContent = commentsTotalCount;
          hideComentsLoader();


        } else {
          countReanderComment += LOAD_COMMENTS_PER_CLICK;
          socialCommentShownCount.textContent = countReanderComment;

        }
      };


      socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);

      bigPhoto.querySelector('img').src = selectedPhoto.querySelector('.picture__img').src;


      bigPhotoSocial.querySelector('.likes-count').textContent = selectedPhoto.querySelector('.picture__likes').textContent;
      socialCommentCount.querySelector('.social__comment-shown-count').textContent = countReanderComment;
      socialCommentCount.querySelector('.social__comment-total-count').textContent = selectedPhoto.querySelector('.picture__comments').textContent;
      bigPhotoSocial.querySelector('.social__caption').textContent = selectedPhoto.querySelector('.picture__img').alt;
      renderMessagesByIndex(index);
      openBigPhoto();

      onClickButtonClose(onSocialCommentsLoaderClick);
      onEscapeKeydown(onSocialCommentsLoaderClick);

    });
  });

};


openPhoto(miniPhoto);
export { openPhoto };
