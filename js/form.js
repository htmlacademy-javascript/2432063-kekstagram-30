import { init, reset } from './effect';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { scalePictureField, onZoomChange, resetScale, pictureElement } from './zoom.js';
import { isEscapeKey } from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неверный хэштег',
  INVALID_COMMENT: 'Длина комментария не может превышать 140 символов',
};

const bodyElement = document.querySelector('body');
const pictureForm = document.querySelector('.img-upload__form');
const pictureUploadContainer = pictureForm.querySelector('.img-upload__overlay');
const pictureOpenInput = pictureForm.querySelector('.img-upload__input');
const pictureCloseButton = pictureForm.querySelector('.img-upload__cancel');
const hashtagField = pictureForm.querySelector('.text__hashtags');
const commentField = pictureForm.querySelector('.text__description');
const submitButton = pictureForm.querySelector('.img-upload__submit');
const effectsPreview = pictureForm.querySelectorAll('.effects__preview');
const fileChooser = document.querySelector('.img-upload__start input[type=file]');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

const pristine = new Pristine(pictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const onHashtagFieldChange = () => {
  toggleSubmitButton(false);
  pristine.validate();
};

const onCommentFieldChange = () => {
  toggleSubmitButton(false);
  pristine.validate();
};

const showForm = () => {
  pictureUploadContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagField.addEventListener('change', onHashtagFieldChange);
  commentField.addEventListener('change', onCommentFieldChange);
};

const closeForm = () => {
  pictureUploadContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureForm.reset();
  pristine.reset();
  resetScale();
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  const fileType = fileName.split('.').pop();
  return FILE_TYPES.includes(fileType);
};

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter(Boolean);

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SIMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  const isErrorMessageExists = Boolean(document.querySelector('.error'));

  if (isEscapeKey(evt) && !isErrorMessageExists) {
    evt.preventDefault();
    closeForm();
  }
}

hashtagField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

commentField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const onPictureInputChange = () => {
  showForm();
};

const onClosePictureButtonClick = () => {
  closeForm();
};

const onFileInputChange = () => {
  const file = pictureOpenInput.files[0];

  if (file && isValidType(file)) {
    const url = URL.createObjectURL(file);
    pictureElement.src = url;
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${url}')`;
    });
  }
};

const maxCommentLength = (comment) => comment.length <= 140;

pristine.addValidator(
  commentField,
  maxCommentLength,
  ErrorText.INVALID_COMMENT,
  4,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);


const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    toggleSubmitButton(true);
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};


const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};


pictureOpenInput.addEventListener('change', onPictureInputChange);
pictureCloseButton.addEventListener('click', onClosePictureButtonClick);
pictureForm.addEventListener('submit', onFormSubmit);
scalePictureField.addEventListener('click', onZoomChange);
fileChooser.addEventListener('change', onFileInputChange);
init();
reset();
