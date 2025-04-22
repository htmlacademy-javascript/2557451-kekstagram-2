import { loadPhotos } from './rendering-thumbnails.js';
import { initializeGallery } from './image-viewer.js';

const RANDOM_PHOTO_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filtersContainerElement = document.querySelector('.img-filters');
const filterDefaultElement = filtersContainerElement.querySelector('#filter-default');
const filterRandomElement = filtersContainerElement.querySelector('#filter-random');
const filterDiscussedElement = filtersContainerElement.querySelector('#filter-discussed');
const contentAreaElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

let photos = [];

const debounce = (callback, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => callback(...args), delay);
  };
};

const clearPhotos = () => {
  contentAreaElement.querySelectorAll('.picture').forEach((image) => image.remove());
};

const renderPhotos = (filteredPhotos) => {
  clearPhotos();

  const fragment = document.createDocumentFragment();

  filteredPhotos.forEach(({ url, description, comments, likes }) => {
    const element = pictureTemplateElement.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__img').alt = description;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;
    fragment.appendChild(element);
  });

  contentAreaElement.append(fragment);
  initializeGallery(filteredPhotos);
};

const debouncedRenderPhotos = debounce(renderPhotos, DEBOUNCE_DELAY);

const applyFilter = (type) => {
  [filterDefaultElement, filterRandomElement, filterDiscussedElement].forEach((btn) =>
    btn.classList.remove('img-filters__button--active')
  );

  const filterMap = {
    default: filterDefaultElement,
    random: filterRandomElement,
    discussed: filterDiscussedElement
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
    filtersContainerElement.classList.remove('img-filters--inactive');

    filterDefaultElement.addEventListener('click', () => applyFilter('default'));
    filterRandomElement.addEventListener('click', () => applyFilter('random'));
    filterDiscussedElement.addEventListener('click', () => applyFilter('discussed'));

    applyFilter('default');
  } catch {
    void 0;
  }
};

export { activateFilters };
