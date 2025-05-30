const ERROR_DISPLAY_TIMEOUT = 5000;
const PHOTOS_API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#data-error').content;
  const errorElement = errorTemplate.cloneNode(true).firstElementChild;

  const errorText = errorElement.querySelector('.error-text');
  errorText.textContent = message || 'Произошла ошибка при загрузке данных';

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
    return photos;
  } catch (error) {
    showErrorMessage(error.message);
    return [];
  }
};

export { loadPhotos };
