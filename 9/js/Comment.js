import { generatesObject } from './data';

const renderMessagesByIndex = (index) => {

  const photos = [...generatesObject];
  const curentPhoto = photos[index];
  const comments = curentPhoto.comments;
  const createListPictures = document.createDocumentFragment();

  const messageTemplate = document.querySelector('.social__comment');
  const socialComments = document.querySelector('.social__comments');

   comments.forEach((coment) => {
    const {avatar, message, name} = coment;

    const element = messageTemplate.cloneNode(true);
    element.querySelector('.social__picture').src = avatar;
    element.querySelector('.social__picture').alt = name;
    element.querySelector('.social__text').textContent = message;
    createListPictures.appendChild(element);
  });

  socialComments.innerHTML = null;
  socialComments.appendChild(createListPictures);

};

export {renderMessagesByIndex};
