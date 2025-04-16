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
let allPhotos = [];

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
};

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

const resetComments = () => {
  commentsShown = 0;
  commentsContainerElement.innerHTML = '';
  shownCommentsElement.textContent = '0';
};

const renderComments = () => {
  const nextBatchCount = Math.min(commentsShown + COMMENTS_PER_LOAD, comments.length);
  const nextBatch = comments.slice(0, nextBatchCount);

  const fragment = document.createDocumentFragment();

  // Очистим старые комментарии
  commentsContainerElement.innerHTML = '';

  nextBatch.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  commentsContainerElement.appendChild(fragment);
  commentsShown = nextBatch.length;

  shownCommentsElement.textContent = commentsShown;
  totalCommentsElement.textContent = comments.length;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const openModal = (photo) => {
  const { url, description, likes, comments: photoComments } = photo;

  imageElement.src = url;
  imageElement.alt = description;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;

  comments = photoComments.slice(); // копируем массив, чтобы не мутировать оригинал
  resetComments();
  renderComments();

  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onThumbnailClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (!pictureElement) return;

  evt.preventDefault();

  const pictureElements = [...contentAreaElement.querySelectorAll('.picture')];
  const pictureIndex = pictureElements.indexOf(pictureElement);

  if (pictureIndex !== -1 && allPhotos[pictureIndex]) {
    openModal(allPhotos[pictureIndex]);
  }
};

const initializeGallery = (photos) => {
  allPhotos = photos;
  contentAreaElement.addEventListener('click', onThumbnailClick);
};

const handleLoadError = (error) => {
  console.error('Ошибка при загрузке фото:', error);
  showErrorMessage();
};

const showErrorMessage = () => {
  const template = document.querySelector('#data-error').content;
  const errorElement = template.cloneNode(true).firstElementChild;

  document.body.appendChild(errorElement);
  setTimeout(() => errorElement.remove(), 5000);
};

loadPhotos()
  .then((photos) => {
    if (!photos || photos.length === 0) {
      throw new Error('Фотографии не загружены или массив пуст.');
    }

    initializeGallery(photos);
    activateFilters(photos);
  })
  .catch(handleLoadError);

// === Обработчики ===
closeButtonElement.addEventListener('click', closeModal);
commentsLoaderElement.addEventListener('click', () => {
  if (commentsShown < comments.length) {
    renderComments();
  }
});

// === Экспорт ===
export { initializeGallery };
