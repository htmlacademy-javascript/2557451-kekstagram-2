import { photoUploadForm, pristine } from './validateForm.js'; // Исправлен импорт формы и валидации
import { uploadOverlay } from './imageUploadModal.js'; // Правильное название переменной
const submitButton = document.querySelector('.img-upload__submit');

const successTemplate = document.querySelector('#success').content.querySelector('.success'); // Шаблон сообщения об успехе
const errorTemplate = document.querySelector('#error').content.querySelector('.error'); // Шаблон сообщения об ошибке

// Блокировка кнопки "Отправить" при отправке формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
};

// Разблокировка кнопки "Отправить" после завершения запроса
const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

// Закрытие формы загрузки изображения
const closeUploadForm = () => {
  photoUploadForm.reset(); // Сбрасываем форму
  pristine.reset(); // Сбрасываем валидацию
  uploadOverlay.classList.add('hidden');
};

// Функция показа сообщений об успехе/ошибке
const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  // Функция закрытия сообщения
  const closeMessage = () => {
    messageElement.remove();
    document.body.classList.remove('modal-open'); // Удаляем класс 'modal-open' при закрытии сообщения
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  };

  // Закрытие сообщения по Esc
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  // Закрытие по клику вне сообщения
  const onOutsideClick = (evt) => {
    if (!messageElement.querySelector('div').contains(evt.target)) {
      closeMessage();
    }
  };

  messageElement.querySelector('button').addEventListener('click', closeMessage); // Закрытие по кнопке
  document.addEventListener('keydown', onEscPress); // Слушаем Esc
  document.addEventListener('click', onOutsideClick); // Слушаем клик вне окна
};

// Обработчик отправки формы
photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) return; // Проверяем валидацию

  blockSubmitButton(); // Блокируем кнопку

  const formData = new FormData(photoUploadForm); // Формируем данные формы

  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка при отправке данных'); // Генерируем ошибку при плохом ответе
      }
      closeUploadForm(); // Закрываем форму при успехе
      showMessage(successTemplate); // Показываем сообщение об успехе
    })
    .catch((error) => {
      console.error('Ошибка при отправке данных:', error); // Логирование ошибки
      showMessage(errorTemplate); // Показываем сообщение об ошибке
    })
    .finally(() => {
      unblockSubmitButton(); // Разблокируем кнопку после запроса
    });
});
