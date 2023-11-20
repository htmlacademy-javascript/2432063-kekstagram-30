import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    return pictures;
  } catch (error) {
    showErrorMessage();
  }
};

const generatesObject = await bootstrap();

export {generatesObject};
