import { getRandomIndex } from './util';

const MAX_RANDOM_INDEX_COUNT = 10;

const filtersElement = document.querySelector('.img-filters');

const filterHandlers = {
  default: (data) => data,

  random: (data) => {
    const randomIndicesList = [];
    const max = Math.min(MAX_RANDOM_INDEX_COUNT, data.length);
    while (randomIndicesList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndicesList.includes(index)) {
        randomIndicesList.push(index);
      }
    }
    return randomIndicesList.map((index) => data[index]);
  },

  discussed: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};


const initGalleryFilters = (data, filter) => {
  if (!!data < 1) {
    filtersElement.classList.add('img-filters--inactive');
    return;
  }
  filtersElement.classList.remove('img-filters--inactive');

  return filterHandlers[filter](data);
};


export { initGalleryFilters };
