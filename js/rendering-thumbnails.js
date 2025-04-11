const ERROR_DISPLAY_TIMEOUT = 5000;
const PHOTOS_API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const showErrorMessage = () => {
  const template = document.querySelector('#data-error').content;
  const errorElement = template.cloneNode(true).firstElementChild;
  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_DISPLAY_TIMEOUT);
};

const loadPhotos = async () => {
  try {
    const response = await fetch(PHOTOS_API_URL);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const photos = await response.json();
    const template = document.querySelector('#picture').content;
    const photoTemplate = template.querySelector('.picture');
    const fragment = document.createDocumentFragment();
    const contentArea = document.querySelector('.pictures');

    // Удаляем старые фото перед отрисовкой
    clearContentArea(contentArea);

    photos.forEach(({ url, description, comments, likes }) => {
      const photoElement = photoTemplate.cloneNode(true);
      const imageTag = photoElement.querySelector('.picture__img');
      const commentTag = photoElement.querySelector('.picture__comments');
      const likesTag = photoElement.querySelector('.picture__likes');

      imageTag.src = url;
      imageTag.alt = description;
      commentTag.textContent = comments.length;
      likesTag.textContent = likes;

      fragment.appendChild(photoElement);
    });

    contentArea.append(fragment);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    return photos;
  } catch (error) {
    console.error('Ошибка загрузки фото:', error);
    showErrorMessage();
    return [];
  }
};

// Удаление старых фотографий
const clearContentArea = (contentArea) => {
  contentArea.querySelectorAll('.picture').forEach((img) => img.remove());
};

export { loadPhotos };
