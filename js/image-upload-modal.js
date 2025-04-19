import { IMAGE_PREVIEW_ELEMENT } from './select-images.js';
import { imagePreviewElement } from './select-size-images.js';
import { effectFieldElement, applyingEffectImage, resetEffects } from './slider-effects.js';

const fileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const closeUploadButton = document.querySelector('.img-upload__cancel');

const previewWrapper = document.querySelector('.img-upload__preview');
const previewImage = previewWrapper.querySelector('img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const bigPictureOverlay = document.querySelector('.big-picture.overlay');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');

const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

let isInputFocused = false;


const resetUploadForm = () => {
  fileInput.value = '';
  imagePreviewElement?.style.setProperty('transform', 'scale(1)');
  effectFieldElement?.classList.add('visually-hidden');
  applyingEffectImage?.style.removeProperty('filter');
  resetEffects();
};

const openUploadModal = (file) => {
  const imageUrl = URL.createObjectURL(file);

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  previewImage.src = imageUrl;

  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url("${imageUrl}")`;
  });

  document.addEventListener('keydown', onEscapeKey);
};

const closeModal = () => {
  if (uploadOverlay.classList.contains('hidden')) {
    return;
  }

  uploadOverlay.classList.add('hidden');
  bigPictureOverlay?.classList.add('hidden');
  body.classList.remove('modal-open');

  IMAGE_PREVIEW_ELEMENT?.classList.remove(...IMAGE_PREVIEW_ELEMENT.classList);
  resetEffects();

  const defaultEffect = document.querySelector('#effect-none');
  if (defaultEffect) {
    defaultEffect.checked = true;
    defaultEffect.focus();
  }

  document.removeEventListener('keydown', onEscapeKey);
};

const onEscapeKey = (evt) => {
  if (evt.key === 'Escape' && !isInputFocused) {
    closeModal();
  }
};

const openBigPictureModal = (pictureData) => {
  bigPictureOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  const bigImage = bigPictureOverlay.querySelector('img');
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


fileInput.addEventListener('click', resetUploadForm);

fileInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (file) {
    openUploadModal(file);
  }
});

closeUploadButton.addEventListener('click', closeModal);
closeBigPictureButton.addEventListener('click', closeModal);

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

export { uploadOverlay };
