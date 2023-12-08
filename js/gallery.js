

const renderPhotos = (photos) =>{
  const photoTemplate = document.querySelector('#picture').content;
  const photosList = document.querySelector('.pictures');

  const createPhotos = photos; // массив фотографий

  const createListPhotos = document.createDocumentFragment();


  // заполняет созданный элемент
  createPhotos.forEach(({url, description, likes, comments}) => {
    const element = photoTemplate.cloneNode(true);
    const photoImg = element.querySelector('.picture__img');
    photoImg.src = url;
    photoImg.alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    createListPhotos.appendChild(element);
  });

  photosList.appendChild(createListPhotos);

};

export { renderPhotos };
