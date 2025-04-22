import { photoUploadFormElement, pristineValidator } from './validate-form.js';
import { uploadOverlayElement } from './image-upload-modal.js';
import { resetEffects } from './slider-effects.js';

const ESC_KEY = 'Escape';

const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const submitButtonElement = document.querySelector('.img-upload__submit');
const fileInputElement = document.querySelector('.img-upload__input');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');

const closeUploadForm = () => {
  photoUploadFormElement.reset();
  pristineValidator.reset();
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInputElement.value = '';
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const disableSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const enableSubmitButton = () => {
  submitButtonElement.disabled = false;
};

function onDocumentEscKeydown(evt) {
  const activeElement = document.activeElement;
  const isTextFieldFocused = activeElement === hashtagInputElement || activeElement === commentInputElement;

  if (evt.key === ESC_KEY && !isTextFieldFocused) {
    evt.preventDefault();
    closeUploadForm();
    resetEffects();
  }
}

function closeMessage(message, shouldRestoreUpload) {
  message.remove();
  document.body.classList.remove('modal-open');

  if (shouldRestoreUpload) {
    uploadOverlayElement.classList.remove('hidden');
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

  function onEscapeKey(evt) {
    if (evt.key === ESC_KEY) {
      closeMessage(message, shouldRestoreUpload);
      document.removeEventListener('keydown', onEscapeKey);
      document.removeEventListener('click', onOutsideClick);
    }
  }

  function onOutsideClick(evt) {
    const innerBox = message.querySelector('div');
    if (innerBox && !innerBox.contains(evt.target)) {
      closeMessage(message, shouldRestoreUpload);
      document.removeEventListener('keydown', onEscapeKey);
      document.removeEventListener('click', onOutsideClick);
    }
  }

  document.addEventListener('keydown', onEscapeKey);
  document.addEventListener('click', onOutsideClick);
};

const onFormSubmit = async (evt) => {
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
    showMessage(successMessageTemplateElement);
  } catch {
    showMessage(errorMessageTemplateElement, true);
  } finally {
    enableSubmitButton();
  }
};

fileInputElement.addEventListener('change', () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
});

photoUploadFormElement.addEventListener('submit', onFormSubmit);
