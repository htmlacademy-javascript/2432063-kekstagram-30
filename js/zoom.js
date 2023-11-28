const MAX_ZOOM = 100;
const MIN_ZOOM = 25;
const STEP_ZOOM = 25;

const scalePictureField = document.querySelector('.img-upload__scale');
const buttonBigger = scalePictureField.querySelector('.scale__control--bigger');
const buttonSmaller = scalePictureField.querySelector('.scale__control--smaller');
const pictureScalePercent = scalePictureField.querySelector('.scale__control--value');
const modalElement = document.querySelector('.img-upload');
const pictureElement = modalElement.querySelector('.img-upload__preview img');

let scaleZoom = parseInt(pictureScalePercent.value.replace('%', ''), 10);

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
  pictureScalePercent.value = `${scaleZoom}%`;
  pictureElement.style.transform = `scale(${scaleZoom / 100})`;
};

const resetScale = () => {
  pictureElement.style.transform = `scale(${MAX_ZOOM / 100})`;
  pictureScalePercent.value = `${MAX_ZOOM}%`;
  scaleZoom = MAX_ZOOM;
};

export { pictureElement, modalElement, scalePictureField, onZoomChange, resetScale };
