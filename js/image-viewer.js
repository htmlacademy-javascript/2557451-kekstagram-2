import { loadPhotos } from './rendering-thumbnails.js';
import { activateFilters } from './switch-photos-element.js';

const COMMENTS_PER_LOAD = 5;

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

let comments = [];
let commentsShown = 0;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);
  return commentElement;
};

const loadMoreComments = () => {
  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_PER_LOAD);
  commentsShown += nextComments.length;

  const fragment = document.createDocumentFragment();
  nextComments.forEach((comment) => fragment.append(createCommentElement(comment)));
  commentsContainerElement.append(fragment);

  shownCommentsElement.textContent = commentsShown;
  commentsLoaderElement.classList.toggle('hidden', commentsShown >= comments.length);
};

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

const closeModal = () => {
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onThumbnailClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (!pictureElement) return;

  evt.preventDefault();

  const pictureIndex = [...contentAreaElement.querySelectorAll('.picture')].indexOf(pictureElement);
  if (pictureIndex === -1) return;

  openModal(window.photos[pictureIndex]);
};

const initializeGallery = (photos) => {
  window.photos = photos; // Сохраняем массив в глобальную переменную для доступа в обработчиках

  contentAreaElement.addEventListener('click', onThumbnailClick);
};

closeButtonElement.addEventListener('click', closeModal);
commentsLoaderElement.addEventListener('click', loadMoreComments);

loadPhotos()
  .then((photos) => {
    if (!photos || photos.length === 0) {
      throw new Error('Фотографии не загружены или массив пуст.');
    }
    initializeGallery(photos);
    activateFilters();
  })
  .catch((error) => {
    console.error('Ошибка при загрузке фото:', error);
  });

export { initializeGallery };
