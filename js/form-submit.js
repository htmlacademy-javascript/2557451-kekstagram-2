import { photoUploadFormElement, pristineValidator } from './validate-form.js';
import { uploadOverlay } from './image-upload-modal.js';

const SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
const ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
const submitButton = document.querySelector('.img-upload__submit');
const fileInput = document.querySelector('.img-upload__input');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const ESC_KEY = 'Escape';

const closeUploadForm = () => {
  photoUploadFormElement.reset();
  pristineValidator.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
};

function onDocumentEscKeydown(evt) {
  const activeElement = document.activeElement;
  const isTextFieldFocused = activeElement === hashtagInput || activeElement === commentInput;

  if (evt.key === ESC_KEY && !isTextFieldFocused) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function closeMessage(message, shouldRestoreUpload) {
  message.remove();
  document.body.classList.remove('modal-open');

  if (shouldRestoreUpload) {
    uploadOverlay.classList.remove('hidden');
  }
}

const showMessage = (template, shouldRestoreUpload = false) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const closeButton = message.querySelector('button');
  if (closeButton) {
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => closeMessage(message, shouldRestoreUpload));
  }

  function escHandler(evt) {
    if (evt.key === ESC_KEY) {
      closeMessage(message, shouldRestoreUpload);
      document.removeEventListener('keydown', escHandler);
      document.removeEventListener('click', clickHandler);
    }
  }

  function clickHandler(evt) {
    const innerBox = message.querySelector('div');
    if (innerBox && !innerBox.contains(evt.target)) {
      closeMessage(message, shouldRestoreUpload);
      document.removeEventListener('keydown', escHandler);
      document.removeEventListener('click', clickHandler);
    }
  }

  document.addEventListener('keydown', escHandler);
  document.addEventListener('click', clickHandler);
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
