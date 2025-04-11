// Импорты
import { photoUploadFormElement, pristineValidator } from './validate-form.js'; // Импорт формы и валидации
import { uploadOverlay } from './image-upload-modal.js'; // Импорт переменной модального окна

// Константы
const SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const SUBMIT_BUTTON = document.querySelector('.img-upload__submit');
const ESC_KEY = 'Escape'; // Константа для клавиши ESC

// Блокировка кнопки "Отправить"
const blockSubmitButton = () => {
  SUBMIT_BUTTON.disabled = true;
};

// Разблокировка кнопки "Отправить"
const unblockSubmitButton = () => {
  SUBMIT_BUTTON.disabled = false;
};

// Закрытие формы загрузки изображения
const closeUploadForm = () => {
  photoUploadFormElement.reset(); // Сбрасываем форму
  pristineValidator.reset(); // Сбрасываем валидацию
  uploadOverlay.classList.add('hidden');
};

// Функция показа сообщений
const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const closeMessage = () => {
    messageElement.remove();
    document.body.classList.remove('modal-open'); // Удаляем класс 'modal-open'
    document.removeEventListener('keydown', onEscPress); // Убираем обработчик
    document.removeEventListener('click', onOutsideClick); // Убираем обработчик
  };

  // Обработчик закрытия по клавише ESC
  const onEscPress = (evt) => {
    if (evt.key === ESC_KEY) {
      closeMessage();
    }
  };

  // Обработчик закрытия по клику вне сообщения
  const onOutsideClick = (evt) => {
    if (!messageElement.querySelector('div').contains(evt.target)) {
      closeMessage();
    }
  };

  // Добавляем текст и слушатель событий
  messageElement.querySelector('button').textContent = 'Close'; // Защита от XSS
  messageElement.querySelector('button').addEventListener('click', closeMessage); // Закрытие по кнопке
  document.addEventListener('keydown', onEscPress); // Слушаем клавишу ESC
  document.addEventListener('click', onOutsideClick); // Слушаем клик вне окна
};

// Обработчик отправки формы
const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristineValidator.validate()) return; // Проверка валидности формы

  blockSubmitButton(); // Блокируем кнопку

  const formData = new FormData(photoUploadFormElement); // Формируем данные формы

  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка при отправке данных');
      }
      closeUploadForm(); // Закрываем форму
      showMessage(SUCCESS_TEMPLATE); // Показываем сообщение об успехе
    })
    .catch((error) => {
      console.error('Ошибка при отправке данных:', error); // Логируем ошибку
      showMessage(ERROR_TEMPLATE); // Показываем сообщение об ошибке
    })
    .finally(() => {
      unblockSubmitButton(); // Разблокируем кнопку
    });
};

// Подключение обработчика отправки формы
photoUploadFormElement.addEventListener('submit', onFormSubmit);
