import { PHOTO_LIST } from './rendering_thumbnails.js';
import { initializeGallery } from './imageViewer.js';

const FILTERS_CONTAINER = document.querySelector('.img-filters');
const FILTER_DEFAULT = FILTERS_CONTAINER.querySelector('#filter-default');
const FILTER_RANDOM = FILTERS_CONTAINER.querySelector('#filter-random');
const FILTER_DISCUSSED = FILTERS_CONTAINER.querySelector('#filter-discussed');

const CONTENT_AREA = document.querySelector('.pictures');
const RANDOM_PHOTO_COUNT = 10;
let photos = [];
let debounceTimer;

const debounce = (callback, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const clearPhotos = () => {
  CONTENT_AREA.querySelectorAll('.picture').forEach((img) => img.remove());
};

const renderPhotos = (filteredPhotos) => {
  clearPhotos();
  const TEMPLATE_PHOTOS = document.querySelector('#picture').content;
  const PHOTO_TEMPLATE = TEMPLATE_PHOTOS.querySelector('.picture');
  const FRAGMENT = document.createDocumentFragment();

  filteredPhotos.forEach((element) => {
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
  initializeGallery(filteredPhotos); // Привязка обработчиков кликов
};

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
}, 500); // Установка задержки в 500 мс

const activateFilters = async () => {
  photos = await PHOTO_LIST();

  FILTERS_CONTAINER.classList.remove('img-filters--inactive');

  FILTER_DEFAULT.addEventListener('click', () => applyFilter('default'));
  FILTER_RANDOM.addEventListener('click', () => applyFilter('random'));
  FILTER_DISCUSSED.addEventListener('click', () => applyFilter('discussed'));

  applyFilter('default'); // Отобразить фото в изначальном порядке
};

export { activateFilters };
