import { photoUploadFormElement, pristineValidator } from './validate-form.js';
import { uploadOverlay } from './image-upload-modal.js';

const SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
const ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const submitButton = document.querySelector('.img-upload__submit');
const fileInput = document.querySelector('.img-upload__input');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const ESC_KEY = 'Escape';

const disableSubmitButton = () => {
  submitButton.disabled = true;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
};

const onDocumentEscKeydown = (evt) => {
  const activeElement = document.activeElement;
  const isTextFieldFocused = activeElement === hashtagInput || activeElement === commentInput;

  if (evt.key === ESC_KEY && !isTextFieldFocused) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const closeUploadForm = () => {
  photoUploadFormElement.reset();
  pristineValidator.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const showMessage = (template, shouldRestoreUpload = false) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const closeMessage = () => {
    message.remove();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);

    if (shouldRestoreUpload) {
      uploadOverlay.classList.remove('hidden');
    }
  };

  const onEscPress = (evt) => {
    if (evt.key === ESC_KEY) {
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    const innerBox = message.querySelector('div');
    if (innerBox && !innerBox.contains(evt.target)) {
      closeMessage();
    }
  };

  const closeButton = message.querySelector('button');
  if (closeButton) {
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', closeMessage);
  }

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
};

const handleFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristineValidator.validate();
  if (!isValid) {
    return;
  }

  disableSubmitButton();

  const formData = new FormData(photoUploadFormElement);

  try {
    const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error();
    }

    closeUploadForm();
    showMessage(SUCCESS_MESSAGE_TEMPLATE);
  } catch {
    showMessage(ERROR_MESSAGE_TEMPLATE, true);
  } finally {
    enableSubmitButton();
  }
};

fileInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
});

photoUploadFormElement.addEventListener('submit', handleFormSubmit);
