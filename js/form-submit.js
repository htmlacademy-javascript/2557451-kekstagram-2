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
const bodyElement = document.body;
const previewWrapperElement = document.querySelector('.img-upload__preview');
const previewImageElement = previewWrapperElement.querySelector('img');
const effectPreviewsElement = document.querySelectorAll('.effects__preview');
const closeUploadButtonElement = document.querySelector('.img-upload__cancel');

const closeUploadForm = () => {
  photoUploadFormElement.reset();
  pristineValidator.reset();
  resetEffects();
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInputElement.value = '';
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

closeUploadButtonElement.addEventListener('click', () => {
  closeUploadForm();
});

const disableSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const enableSubmitButton = () => {
  submitButtonElement.disabled = false;
};

function onDocumentEscKeydown(evt) {
  const activeElement = document.activeElement;
  const isTextFieldFocused = activeElement === hashtagInputElement || activeElement === commentInputElement;
  const isErrorVisible = document.querySelector('.error');

  if (evt.key === ESC_KEY && !isTextFieldFocused && !isErrorVisible) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function closeMessage(message) {
  message.remove();
}

const showMessage = (template, shouldRestoreUpload = false) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const closeButton = message.querySelector('button');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeMessage(message));
  }

  function onEscapeKey(evt) {
    if (evt.key === ESC_KEY) {
      closeMessage(message);
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

const openUploadModal = (file) => {
  const imageUrl = URL.createObjectURL(file);

  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  previewImageElement.src = imageUrl;

  effectPreviewsElement.forEach((preview) => {
    preview.style.backgroundImage = `url("${imageUrl}")`;
  });
};

fileInputElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (file) {
    openUploadModal(file);
  }
  document.addEventListener('keydown', onDocumentEscKeydown);
});

photoUploadFormElement.addEventListener('submit', onFormSubmit);
