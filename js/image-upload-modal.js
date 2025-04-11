import { IMAGE_PREVIEW_ELEMENT } from './select-images.js';
import { imagePreviewElement } from './select-size-images.js';
import { effectFieldElement, applyingEffectImage } from './slider-effects.js';

const uploadImage = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const upLoadPreview = document.querySelector('.img-upload__preview');
const picturePreview = upLoadPreview.querySelector('img');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureOverlay = document.querySelector('.big-picture.overlay'); // Окно просмотра фото
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

let isInputFocused = false;

// Сброс значений при клике на поле загрузки
uploadImage.addEventListener('click', () => {
  uploadImage.value = '';

  imagePreviewElement?.style.setProperty('transform', 'scale(1)');
  effectFieldElement?.classList.add('visually-hidden');
  applyingEffectImage?.style.removeProperty('filter');
});

// Открытие модального окна при загрузке файла
uploadImage.addEventListener('change', (event) => {
  const filePicture = event.target.files[0];

  if (filePicture) {
    const filePictureUrl = URL.createObjectURL(filePicture);
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    picturePreview.src = filePictureUrl;

    effectsPreviewElements.forEach((element) => {
      element.style.backgroundImage = `url("${filePictureUrl}")`;
    });

    document.addEventListener('keydown', onEscapePress);
  }
});

// Функция закрытия модального окна
const closeModal = () => {
  if (uploadOverlay.classList.contains('hidden')) return;

  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  IMAGE_PREVIEW_ELEMENT?.classList.remove(...IMAGE_PREVIEW_ELEMENT.classList);

  bigPictureOverlay?.classList.add('hidden');

  const defaultRadio = document.querySelector('#effect-none');
  if (defaultRadio) {
    defaultRadio.checked = true;
    defaultRadio.focus();
  }

  document.removeEventListener('keydown', onEscapePress);
};

// Обработчики закрытия
imageUploadCancel.addEventListener('click', closeModal);
bigPictureCancel.addEventListener('click', closeModal);

// Обработчики фокуса в полях ввода
[hashtagInput, descriptionInput].forEach((input) => {
  input?.addEventListener('focus', () => (isInputFocused = true));
  input?.addEventListener('blur', () => (isInputFocused = false));
});

// Закрытие по Escape
const onEscapePress = (evt) => {
  if (evt.key === 'Escape' && !isInputFocused) {
    closeModal();
  }
};

export { uploadOverlay };


