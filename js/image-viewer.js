import { loadPhotos } from './rendering-thumbnails.js';
import { activateFilters } from './switch-photos-element.js';

// === Константы ===
const COMMENTS_PER_LOAD = 5;

// === DOM-элементы ===
const modalElement = document.querySelector('.big-picture');
const closeButtonElement = document.querySelector('.big-picture__cancel');
const imageElement = document.querySelector('.big-picture__img img');
const likesElement = document.querySelector('.likes-count');
const totalCommentsElement = document.querySelector('.social__comment-total-count');
const shownCommentsElement = document.querySelector('.social__comment-shown-count');
const descriptionElement = document.querySelector('.social__caption');
const commentsContainerElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.comments-loader');
const contentAreaElement = document.querySelector('.pictures');

// === Переменные состояния ===
let comments = [];
let commentsShown = 0;

// === Обработка клавиши Escape ===
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

// === Создание DOM-элемента комментария ===
const createCommentElement = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  comment.append(avatarElement, textElement);
  return comment;
};

// === Загрузка порции комментариев ===
const loadMoreComments = () => {
  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_PER_LOAD);
  commentsShown += nextComments.length;

  const fragment = document.createDocumentFragment();
  nextComments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  commentsContainerElement.append(fragment);
  shownCommentsElement.textContent = commentsShown;
  commentsLoaderElement.classList.toggle('hidden', commentsShown >= comments.length);
};

// === Открытие модального окна с изображением ===
const openModal = (photo) => {
  const { url, description, likes, comments: photoComments } = photo;

  imageElement.src = url;
  imageElement.alt = description;
  likesElement.textContent = likes;
  totalCommentsElement.textContent = photoComments.length;
  descriptionElement.textContent = description;

  comments = photoComments;
  commentsShown = 0;
  commentsContainerElement.innerHTML = '';

  loadMoreComments();

  modalElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

// === Закрытие модального окна ===
const closeModal = () => {
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// === Обработка клика по миниатюре ===
const onThumbnailClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (!pictureElement) return;

  evt.preventDefault();

  const pictureIndex = [...contentAreaElement.querySelectorAll('.picture')].indexOf(pictureElement);
  if (pictureIndex === -1) return;

  openModal(window.photos[pictureIndex]);
};

// === Инициализация галереи с фото ===
const initializeGallery = (photos) => {
  window.photos = photos; // Временно храним в глобальной переменной
  contentAreaElement.addEventListener('click', onThumbnailClick);
};

// === Обработка ошибки загрузки ===
const handleLoadError = (error) => {
  console.error('Ошибка при загрузке фото:', error);
  showErrorMessage();
};

// === Показ сообщения об ошибке ===
const showErrorMessage = () => {
  const template = document.querySelector('#data-error').content;
  const errorElement = template.cloneNode(true).firstElementChild;

  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

// === Загрузка и инициализация ===
loadPhotos()
  .then((photos) => {
    if (!photos || photos.length === 0) {
      throw new Error('Фотографии не загружены или массив пуст.');
    }

    initializeGallery(photos);
    activateFilters(photos);
  })
  .catch(handleLoadError);

// === Обработчики событий ===
closeButtonElement.addEventListener('click', closeModal);
commentsLoaderElement.addEventListener('click', loadMoreComments);

// === Экспорт ===
export { initializeGallery };
