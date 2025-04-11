import { PHOTO_LIST } from './rendering_thumbnails.js';
import { activateFilters } from './switchPhotosElement.js'; // Импортируем активацию фильтров

const openModal = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const modalPicture = document.querySelector('.big-picture__img img');
const imageLikes = document.querySelector('.likes-count');
const totalComments = document.querySelector('.social__comment-total-count');
const shownCommentsCount = document.querySelector('.social__comment-shown-count'); // Элемент для текущего кол-ва показанных комментариев
const descriptionPhoto = document.querySelector('.social__caption');
const getAllCommentsContainer = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');

const perLoadComments = 5;
let comments = [];
let commentsShown = 0;

// Функция загрузки комментариев порциями
const loadMoreComments = () => {
  const nextComments = comments.slice(commentsShown, commentsShown + perLoadComments);
  commentsShown += nextComments.length;

  nextComments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentElement.appendChild(commentAvatar);
    commentElement.appendChild(commentText);
    getAllCommentsContainer.appendChild(commentElement);
  });

  // Обновляем счетчик показанных комментариев
  shownCommentsCount.textContent = commentsShown;

  if (commentsShown >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

// Функция инициализации галереи
const initializeGallery = (photos) => {
  const contentArea = document.querySelector('.pictures');

  // Делегирование событий: вешаем обработчик на общий контейнер
  contentArea.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (!pictureElement) return;

    evt.preventDefault();

    const pictureIndex = [...contentArea.querySelectorAll('.picture')].indexOf(pictureElement);
    if (pictureIndex === -1 || !photos[pictureIndex]) {
      console.error('Ошибка: изображение не найдено или нет данных.');
      return;
    }

    const photoData = photos[pictureIndex];

    modalPicture.src = photoData.url;
    modalPicture.alt = photoData.description;
    imageLikes.textContent = photoData.likes;
    totalComments.textContent = photoData.comments.length;
    descriptionPhoto.textContent = photoData.description;

    comments = photoData.comments;
    commentsShown = 0;
    getAllCommentsContainer.innerHTML = '';

    loadMoreComments();
    openModal.classList.remove('hidden');

    // Добавляем обработчик клавиши Escape
    document.addEventListener('keydown', onEscapeCloseBigPicture);
  });
};

// Функция закрытия большого изображения
const closeBigPicture = () => {
  openModal.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeCloseBigPicture);
};

// Обработчик закрытия окна по нажатию Escape
const onEscapeCloseBigPicture = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

// Закрытие модального окна при клике на кнопку
cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});

// Ждем загрузки картинок, затем инициализируем галерею
PHOTO_LIST()
  .then((photos) => {
    if (!photos || photos.length === 0) {
      throw new Error('Фотографии не загружены или массив пуст.');
    }
    initializeGallery(photos);
    activateFilters(); // Активируем фильтры после инициализации галереи
  })
  .catch((error) => {
    console.error('Ошибка при загрузке фото:', error);
  });

commentsLoaderButton.addEventListener('click', loadMoreComments);

export { initializeGallery };
