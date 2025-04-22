import { imagePreviewElement } from './select-size-images.js';
import { effectFieldElement, applyingEffectImageElement, resetEffects } from './slider-effects.js';

const fileInputElement = document.querySelector('.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const closeUploadButtonElement = document.querySelector('.img-upload__cancel');
const previewWrapperElement = document.querySelector('.img-upload__preview');
const previewImageElement = previewWrapperElement.querySelector('img');
const effectPreviewsElement = document.querySelectorAll('.effects__preview');
const bigPictureOverlayElement = document.querySelector('.big-picture.overlay');
const closeBigPictureButtonElement = document.querySelector('.big-picture__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

let isInputFocused = false;

const onEscapeKey = (evt) => {
  if (evt.key === 'Escape' && !isInputFocused) {
    onModalCloseClick();
  }
};

const onUploadFormReset = () => {
  fileInputElement.value = '';
  imagePreviewElement?.style.setProperty('transform', 'scale(1)');
  effectFieldElement?.classList.add('visually-hidden');
  applyingEffectImageElement?.style.removeProperty('filter');
  resetEffects();
};

const openUploadModal = (file) => {
  const imageUrl = URL.createObjectURL(file);

  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  previewImageElement.src = imageUrl;

  effectPreviewsElement.forEach((preview) => {
    preview.style.backgroundImage = `url("${imageUrl}")`;
  });

  document.addEventListener('keydown', onEscapeKey);
};

function onModalCloseClick () {
  if (uploadOverlayElement.classList.contains('hidden')) {
    return;
  }

  uploadOverlayElement.classList.add('hidden');
  bigPictureOverlayElement?.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  imagePreviewElement?.classList.remove(...imagePreviewElement.classList);
  resetEffects();

  const defaultEffect = document.querySelector('#effect-none');
  if (defaultEffect) {
    defaultEffect.checked = true;
    defaultEffect.focus();
  }

  document.removeEventListener('keydown', onEscapeKey);
}

const openBigPictureModal = (pictureData) => {
  bigPictureOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  const bigImage = bigPictureOverlayElement.querySelector('img');
  bigImage.src = pictureData.url;
  bigImage.alt = pictureData.alt;

  document.addEventListener('keydown', onEscapeKey);
};

const getPictureData = (id) => ({
  url: `https://example.com/images/${id}.jpg`,
  alt: `Image ${id}`,
});

const onThumbnailClick = (evt) => {
  const pictureId = evt.target.dataset.id;
  const pictureData = getPictureData(pictureId);

  if (pictureData) {
    openBigPictureModal(pictureData);
  }
};

fileInputElement.addEventListener('click', onUploadFormReset);

fileInputElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (file) {
    openUploadModal(file);
  }
});

closeUploadButtonElement.addEventListener('click', onModalCloseClick);
closeBigPictureButtonElement.addEventListener('click', onModalCloseClick);

[hashtagInput, descriptionInput].forEach((input) => {
  input?.addEventListener('focus', () => {
    isInputFocused = true;
  });
  input?.addEventListener('blur', () => {
    isInputFocused = false;
  });
});

document.querySelectorAll('.picture-thumbnail').forEach((thumb) => {
  thumb.addEventListener('click', onThumbnailClick);
});

export { uploadOverlayElement };
