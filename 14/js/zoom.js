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
    if (scaleZoom > 25) {
      scaleZoom -= 25;
    }
  } else if (evt.target === buttonBigger) {
    if (scaleZoom < 100) {
      scaleZoom += 25;
    }
  }
  pictureScalePercent.value = `${scaleZoom}%`;
  pictureElement.style.transform = `scale(${scaleZoom / 100})`;
};

const resetScale = () => {
  pictureElement.style.transform = `scale(${1})`;
  pictureScalePercent.value = '100%';
};

export { pictureElement, modalElement, scalePictureField, onZoomChange, resetScale };
