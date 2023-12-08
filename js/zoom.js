const MAX_ZOOM = 100;
const MIN_ZOOM = 25;
const STEP_ZOOM = 25;

const scalePhotoField = document.querySelector('.img-upload__scale');
const buttonBigger = scalePhotoField.querySelector('.scale__control--bigger');
const buttonSmaller = scalePhotoField.querySelector('.scale__control--smaller');
const photosScalePercent = scalePhotoField.querySelector('.scale__control--value');
const modalElement = document.querySelector('.img-upload');
const photoElement = modalElement.querySelector('.img-upload__preview img');

let scaleZoom = parseInt(photosScalePercent.value.replace('%', ''), 10);

const onZoomChange = (evt) => {
  evt.preventDefault();

  if (evt.target === buttonSmaller) {
    if (scaleZoom > MIN_ZOOM) {
      scaleZoom -= STEP_ZOOM;
    }
  } else if (evt.target === buttonBigger) {
    if (scaleZoom < MAX_ZOOM) {
      scaleZoom += STEP_ZOOM;
    }
  }
  photosScalePercent.value = `${scaleZoom}%`;
  photoElement.style.transform = `scale(${scaleZoom / 100})`;
};

const resetScale = () => {
  photoElement.style.transform = `scale(${MAX_ZOOM / 100})`;
  photosScalePercent.value = `${MAX_ZOOM}%`;
  scaleZoom = MAX_ZOOM;
};

export { photoElement, modalElement, scalePhotoField, onZoomChange, resetScale };
