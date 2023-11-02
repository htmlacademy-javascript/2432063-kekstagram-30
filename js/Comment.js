import { generatesObject } from './data';

const objectList = [...generatesObject];

const curentObject = objectList[0];
const comments = curentObject.comments;
const createListPictures = document.createDocumentFragment();

const messageTemplate = document.createElement('li');
const socialComments = document.querySelector('.social__comments');

messageTemplate.innerHTML = `
<img class="social__picture" src="" alt="" width="35" height="35">
<p class="social__text">{{текст комментария}}</p>
`;

comments.forEach((coment) => {
  const {avatar, message, name} = coment;
  const element = messageTemplate.cloneNode(true);
  element.setAttribute('class', 'social__comment');
  element.querySelector('.social__picture').src = avatar;
  element.querySelector('.social__picture').alt = name;
  element.querySelector('.social__text').textContent = message;
  createListPictures.appendChild(element);
});

socialComments.appendChild(createListPictures);

export {socialComments};
