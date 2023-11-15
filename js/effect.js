const effectsName = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [effectsName.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [effectsName.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [effectsName.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [effectsName.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [effectsName.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [effectsName.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effectsName.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effectsName.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effectsName.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effectsName.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [effectsName.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectLevelElement = modalElement.querySelector('.effect-level__value');

let chosenEffect = effectsName.DEFAULT;

const isDefault = () => chosenEffect === effectsName.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageElement.style.filter = null;
    return;
  }
  const { value } = effectLevelElement;
  const { style, unit } = effectToFilter[chosenEffect];
  imageElement.style.filter = `${style}(${value}${unit})`;
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
  setEffect(effectsName.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};
export { init, reset };
