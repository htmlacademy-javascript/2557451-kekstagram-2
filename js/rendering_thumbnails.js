const showErrorMessage = () => {
  const template = document.querySelector('#data-error').content;
  const errorElement = template.cloneNode(true);
  document.body.appendChild(errorElement);

  setTimeout(() => {
    const errorMessage = document.querySelector('.data-error');
    if (errorMessage) {
      errorMessage.remove();
    }
  }, 5000);
};

const PHOTO_LIST = async () => {
  try {
    const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const values = await response.json();

    const TEMPLATE_PHOTOS = document.querySelector('#picture').content;
    const PHOTO_TEMPLATE = TEMPLATE_PHOTOS.querySelector('.picture');
    const FRAGMENT = document.createDocumentFragment();
    const CONTENT_AREA = document.querySelector('.pictures');

    // Удаляем старые фото перед отрисовкой
    CONTENT_AREA.querySelectorAll('.picture').forEach(img => img.remove());

    values.forEach((element) => {
      const cloneTemplatePhotos = PHOTO_TEMPLATE.cloneNode(true);
      const getImageTag = cloneTemplatePhotos.querySelector('.picture__img');
      const getPictureCommentTag = cloneTemplatePhotos.querySelector('.picture__comments');
      const getPictureLikesTag = cloneTemplatePhotos.querySelector('.picture__likes');

      getImageTag.src = element.url;
      getImageTag.alt = element.description;
      getPictureCommentTag.textContent = element.comments.length;
      getPictureLikesTag.textContent = element.likes;

      FRAGMENT.appendChild(cloneTemplatePhotos);
    });

    CONTENT_AREA.append(FRAGMENT);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    return values;
  } catch (error) {
    console.error('Ошибка загрузки фото:', error);
    showErrorMessage();
    return []; // Возвращаем пустой массив, чтобы не было ошибок при переборе
  }
};

export { PHOTO_LIST };
