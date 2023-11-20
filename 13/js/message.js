import { isEscapeKey } from './util';

const successMesageElement = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMesageElement = document
  .querySelector('#error')
  .content
  .querySelector('.error');


const hideMessage = () => {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onCloseButtonClick = () => {
  hideMessage();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick (evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }

  hideMessage();
}

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element
    .querySelector(buttonClass)
    .addEventListener('click', onCloseButtonClick);
};

const showSuccessMessage = () => {
  showMessage(successMesageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMesageElement, '.error__button');
};


export { showSuccessMessage, showErrorMessage };
