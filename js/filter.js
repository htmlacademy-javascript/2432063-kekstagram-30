const filtersElement = document.querySelector('.img-filters');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const MAX_RANDOM_INDEX_COUNT = 10;

const filterHandlers = {
  default: (data) => data,

  random: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_INDEX_COUNT, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },

  discussed: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};


const initGalleryFilters = (data, filter) => {
  filtersElement.classList.remove('img-filters--inactive');
  return filterHandlers[filter](data);
};


export { initGalleryFilters };
