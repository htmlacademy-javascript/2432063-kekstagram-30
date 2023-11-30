import { fPhoto } from './data';

const createListPictures = document.createDocumentFragment();
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const socialComments = document.querySelector('.social__comments');
const messageTemplate = document.querySelector('.social__comment');


const renderMessagesRange = (comments, startIndex) => {
  const cointss = 5;
  comments.forEach((coment, runIndex) => {
    if (runIndex <= startIndex + cointss - 1) {
      const {avatar, message, name} = coment;
      const element = messageTemplate.cloneNode(true);
      element.querySelector('.social__picture').src = avatar;
      element.querySelector('.social__picture').alt = name;
      element.querySelector('.social__text').textContent = message;
      createListPictures.appendChild(element);
    }
  });
};

const getMessagesByIndex = (index) => {
  const photos = [...fPhoto];
  const curentPhoto = photos[index];
  return curentPhoto.comments;
};


const renderMessagesByIndex = (index) => {
  const comments = getMessagesByIndex(index);
  let startIndex = 0;

  const renderMessages = () =>{
    startIndex += 5;
    socialComments.innerHTML = null;
    renderMessagesRange(comments, startIndex);
    socialComments.appendChild(createListPictures);
  };

  socialCommentsLoader.addEventListener('click', renderMessages);

  renderMessagesRange(comments, startIndex);

  socialComments.innerHTML = null;
  socialComments.appendChild(createListPictures);
};


export {renderMessagesByIndex};
