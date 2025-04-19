import { loadPhotos } from './rendering-thumbnails.js';
import { initializeGallery } from './image-viewer.js';

const FILTERS_CONTAINER = document.querySelector('.img-filters');
const FILTER_DEFAULT = FILTERS_CONTAINER.querySelector('#filter-default');
const FILTER_RANDOM = FILTERS_CONTAINER.querySelector('#filter-random');
const FILTER_DISCUSSED = FILTERS_CONTAINER.querySelector('#filter-discussed');
const CONTENT_AREA = document.querySelector('.pictures');

const RANDOM_PHOTO_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let photos = [];

const debounce = (callback, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => callback(...args), delay);
  };
};

const clearPhotos = () => {
  CONTENT_AREA.querySelectorAll('.picture').forEach((image) => image.remove());
};

const renderPhotos = (filteredPhotos) => {
  clearPhotos();

  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  filteredPhotos.forEach(({ url, description, comments, likes }) => {
    const element = template.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;
    fragment.appendChild(element);
  });

  CONTENT_AREA.append(fragment);
  initializeGallery(filteredPhotos);
};

const debouncedRenderPhotos = debounce(renderPhotos, DEBOUNCE_DELAY);

const applyFilter = (type) => {
  [FILTER_DEFAULT, FILTER_RANDOM, FILTER_DISCUSSED].forEach((btn) =>
    btn.classList.remove('img-filters__button--active')
  );

  const filterMap = {
    default: FILTER_DEFAULT,
    random: FILTER_RANDOM,
    discussed: FILTER_DISCUSSED
  };

  filterMap[type].classList.add('img-filters__button--active');

  let filteredPhotos;
  switch (type) {
    case 'random':
      filteredPhotos = [...photos].sort(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTO_COUNT);
      break;
    case 'discussed':
      filteredPhotos = [...photos].sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filteredPhotos = [...photos];
  }

  debouncedRenderPhotos(filteredPhotos);
};

const activateFilters = async () => {
  try {
    photos = await loadPhotos();
    FILTERS_CONTAINER.classList.remove('img-filters--inactive');

    FILTER_DEFAULT.addEventListener('click', () => applyFilter('default'));
    FILTER_RANDOM.addEventListener('click', () => applyFilter('random'));
    FILTER_DISCUSSED.addEventListener('click', () => applyFilter('discussed'));

    applyFilter('default');
  } catch {
    void 0;
  }
};

export { activateFilters };
