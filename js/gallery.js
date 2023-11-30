const renderPhotos = (photos) =>{
  const photoTemplate = document.querySelector('#picture').content;
  const photosList = document.querySelector('.pictures');

  const createPhotos = photos; // массив фотографий

  const createListPictures = document.createDocumentFragment();


  // заполняет созданный элемент
  createPhotos.forEach(({url, description, likes, comments}) => {
    const element = photoTemplate.cloneNode(true);
    const pictureImg = element.querySelector('.picture__img');
    pictureImg.src = url;
    pictureImg.alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    createListPictures.appendChild(element);
  });

  photosList.appendChild(createListPictures);

};

export { renderPhotos };
