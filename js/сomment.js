import { photo } from './data';
const createListPhotos = document.createDocumentFragment();
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const socialComments = document.querySelector('.social__comments');
const messageTemplate = document.querySelector('.social__comment');


const renderMessagesRange = (comments, startIndex) => {
  const cointss = 5;
  comments.forEach((coment, runIndex) => {
    if (runIndex <= startIndex + cointss - 1) {
      const {avatar, message, name} = coment;
      const element = messageTemplate.cloneNode(true);
      const socialPhotos = element.querySelector('.social__picture');
      socialPhotos.src = avatar;
      socialPhotos.alt = name;
      element.querySelector('.social__text').textContent = message;
      createListPhotos.appendChild(element);
    }
  });
};

const getMessagesByIndex = (index) => {

  const curentPhoto = photo[index];
  return curentPhoto.comments;
};


const renderMessagesByIndex = (index) => {
  const comments = getMessagesByIndex(index);
  let startIndex = 0;

  const onRrenderMessages = () =>{
    startIndex += 5;
    socialComments.innerHTML = null;
    renderMessagesRange(comments, startIndex);
    socialComments.appendChild(createListPhotos);
  };

  socialCommentsLoader.addEventListener('click', onRrenderMessages);

  renderMessagesRange(comments, startIndex);

  socialComments.innerHTML = null;
  socialComments.appendChild(createListPhotos);
};


export {renderMessagesByIndex};
