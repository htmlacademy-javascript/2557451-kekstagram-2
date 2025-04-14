// === Импорт зависимостей ===
import { photoUploadFormElement, pristineValidator } from './validate-form.js';
import { uploadOverlay } from './image-upload-modal.js';

// === Константы ===
const SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
const ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const submitButton = document.querySelector('.img-upload__submit');
const ESC_KEY = 'Escape';

// === Управление кнопкой отправки ===
const disableSubmitButton = () => {
  submitButton.disabled = true;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
};

// === Закрытие формы загрузки ===
const closeUploadForm = () => {
  photoUploadFormElement.reset();         // Сброс значений формы
  pristineValidator.reset();              // Сброс валидации
  uploadOverlay.classList.add('hidden');  // Скрытие модального окна
};

// === Показ сообщения (успех или ошибка) ===
const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const closeMessage = () => {
    message.remove();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  };

  const onEscPress = (evt) => {
    if (evt.key === ESC_KEY) closeMessage();
  };

  const onOutsideClick = (evt) => {
    const innerBox = message.querySelector('div');
    if (innerBox && !innerBox.contains(evt.target)) closeMessage();
  };

  const closeButton = message.querySelector('button');
  if (closeButton) {
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', closeMessage);
  } else {
    console.warn('Кнопка закрытия не найдена в шаблоне сообщения!');
  }

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
};

// === Обработка отправки формы ===
const handleFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristineValidator.validate();
  if (!isValid) return;

  disableSubmitButton();

  const formData = new FormData(photoUploadFormElement);

  try {
    const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }

    closeUploadForm();
    showMessage(SUCCESS_MESSAGE_TEMPLATE);
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    showMessage(ERROR_MESSAGE_TEMPLATE);
  } finally {
    enableSubmitButton();
  }
};

// === Инициализация ===
photoUploadFormElement.addEventListener('submit', handleFormSubmit);
