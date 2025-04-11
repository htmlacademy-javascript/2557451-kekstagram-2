import { loadPhotos } from './rendering-thumbnails.js';
import { initializeGallery } from './image-viewer.js';

// Константы
const FILTERS_CONTAINER = document.querySelector('.img-filters');
const FILTER_DEFAULT = FILTERS_CONTAINER.querySelector('#filter-default');
const FILTER_RANDOM = FILTERS_CONTAINER.querySelector('#filter-random');
const FILTER_DISCUSSED = FILTERS_CONTAINER.querySelector('#filter-discussed');

const CONTENT_AREA = document.querySelector('.pictures');
const RANDOM_PHOTO_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let photos = [];
let debounceTimer;

// debounce функция
const debounce = (callback, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => callback(...args), delay);
  };
};

// Очистка фотографий
const clearPhotos = () => {
  CONTENT_AREA.querySelectorAll('.picture').forEach((image) => image.remove());
};

// Рендеринг фотографий
const renderPhotos = (filteredPhotos) => {
  clearPhotos();
  const templatePhotos = document.querySelector('#picture').content;
  const photoTemplate = templatePhotos.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  filteredPhotos.forEach(({ url, description, comments, likes }) => {
    const clonedTemplate = photoTemplate.cloneNode(true);
    const imageTag = clonedTemplate.querySelector('.picture__img');
    const commentsTag = clonedTemplate.querySelector('.picture__comments');
    const likesTag = clonedTemplate.querySelector('.picture__likes');

    imageTag.src = url;
    imageTag.alt = description;
    commentsTag.textContent = comments.length;
    likesTag.textContent = likes;

    fragment.appendChild(clonedTemplate);
  });

  CONTENT_AREA.append(fragment);
  initializeGallery(filteredPhotos); // Привязка обработчиков кликов
};

// Применение фильтра
const applyFilter = debounce((filter) => {
  let filteredPhotos = [];

  switch (filter) {
    case 'random':
      filteredPhotos = [...photos].sort(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTO_COUNT);
      break;
    case 'discussed':
      filteredPhotos = [...photos].sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filteredPhotos = [...photos]; // Исходный порядок
  }

  renderPhotos(filteredPhotos);

  FILTER_DEFAULT.classList.remove('img-filters__button--active');
  FILTER_RANDOM.classList.remove('img-filters__button--active');
  FILTER_DISCUSSED.classList.remove('img-filters__button--active');

  if (filter === 'random') {
    FILTER_RANDOM.classList.add('img-filters__button--active');
  } else if (filter === 'discussed') {
    FILTER_DISCUSSED.classList.add('img-filters__button--active');
  } else {
    FILTER_DEFAULT.classList.add('img-filters__button--active');
  }
}, DEBOUNCE_DELAY);

// Активация фильтров
const activateFilters = async () => {
  photos = await loadPhotos();

  FILTERS_CONTAINER.classList.remove('img-filters--inactive');

  FILTER_DEFAULT.addEventListener('click', () => applyFilter('default'));
  FILTER_RANDOM.addEventListener('click', () => applyFilter('random'));
  FILTER_DISCUSSED.addEventListener('click', () => applyFilter('discussed'));

  applyFilter('default'); // Отобразить фото в изначальном порядке
};

export { activateFilters };
