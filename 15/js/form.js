import { init, reset } from './effect';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { scalePictureField, onZoomChange, resetScale, pictureElement } from './zoom.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неверный хэштег',
};


const pictureForm = document.querySelector('.img-upload__form');
const pictureUploadContainer = pictureForm.querySelector('.img-upload__overlay');
const pictureOpeninput = pictureForm.querySelector('.img-upload__input');
const pictureCloseButton = pictureForm.querySelector('.img-upload__cancel');
const form = document.getElementById('upload-select-image');
const hashtagField = pictureForm.querySelector('.text__hashtags');
const commentField = pictureForm.querySelector('.text__description');
const submitButton = pictureForm.querySelector('.img-upload__submit');
const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const effectsPreview = pictureForm.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

const pristine = new Pristine(pictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showForm = () => {
  pictureUploadContainer.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  init();
};

const closeForm = () => {
  form.reset();
  pristine.reset();
  pictureUploadContainer.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  reset ();
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SIMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

const onPictureInputChange = () => {
  showForm();
};

const onClosePictureButtonClick = () => {
  closeForm();
};

const onFileInputChange = () => {
  const file = pictureOpeninput.files[0];

  if (file && isValidType(file)) {
    pictureElement.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${pictureElement.src}')`;
    });
  }
};

const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    toggleSubmitButton(true);
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    toggleSubmitButton(false);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

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

pictureOpeninput.addEventListener('change', onPictureInputChange);
pictureCloseButton.addEventListener('click', onClosePictureButtonClick);
form.addEventListener('submit', onFormSubmit);
scalePictureField.addEventListener('click', onZoomChange);
fileChooser.addEventListener('change', onFileInputChange);
