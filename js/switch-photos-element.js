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
let debounceTimer;

// debounce-функция
const debounce = (callback, delay) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => callback(...args), delay);
  };
};

// Удаление всех миниатюр
const clearPhotos = () => {
  CONTENT_AREA.querySelectorAll('.picture').forEach((image) => image.remove());
};

// Отрисовка миниатюр
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

// Применение фильтра
const applyFilter = (type) => {
  const getFilteredPhotos = () => {
    switch (type) {
      case 'random':
        return [...photos].sort(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTO_COUNT);
      case 'discussed':
        return [...photos].sort((a, b) => b.comments.length - a.comments.length);
      default:
        return [...photos];
    }
  };

  // Убираем активный класс у всех фильтров и добавляем к выбранному
  [FILTER_DEFAULT, FILTER_RANDOM, FILTER_DISCUSSED].forEach((btn) =>
    btn.classList.remove('img-filters__button--active')
  );

  const filterMap = {
    default: FILTER_DEFAULT,
    random: FILTER_RANDOM,
    discussed: FILTER_DISCUSSED
  };

  filterMap[type].classList.add('img-filters__button--active');

  // Отложенная отрисовка с дебаунсом
  debouncedRender(getFilteredPhotos());
};

// Функция с дебаунсом для отрисовки миниатюр
const debouncedRender = debounce((filteredPhotos) => {
  renderPhotos(filteredPhotos);
}, DEBOUNCE_DELAY);

// Инициализация фильтров
const activateFilters = async () => {
  try {
    photos = await loadPhotos(); // Загружаем фото
    FILTERS_CONTAINER.classList.remove('img-filters--inactive');

    // Применяем фильтры по клику
    FILTER_DEFAULT.addEventListener('click', () => applyFilter('default'));
    FILTER_RANDOM.addEventListener('click', () => applyFilter('random'));
    FILTER_DISCUSSED.addEventListener('click', () => applyFilter('discussed'));

    applyFilter('default'); // Применяем фильтр по умолчанию сразу
  } catch (error) {
    console.error('Ошибка загрузки фотографий:', error);
  }
};

export { activateFilters };
