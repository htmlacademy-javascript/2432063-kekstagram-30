import {photoElement, modalElement } from './zoom.js';

const EffectsName = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [EffectsName.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [EffectsName.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [EffectsName.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [EffectsName.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [EffectsName.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [EffectsName.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [EffectsName.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EffectsName.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EffectsName.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [EffectsName.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [EffectsName.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectLevelElement = modalElement.querySelector('.effect-level__value');

let chosenEffect = EffectsName.DEFAULT;

const isDefault = () => chosenEffect === EffectsName.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    photoElement.style.filter = null;
    return;
  }
  const { value } = effectLevelElement;
  const { style, unit } = effectToFilter[chosenEffect];
  photoElement.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(EffectsName.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};

export { init, reset };

