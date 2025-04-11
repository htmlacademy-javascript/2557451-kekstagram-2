import { picturePreviewEffects } from './selectImages.js';
import { scaleImageSize } from './selectSizeImages.js';
import { fieldselEffectElement, applyingEffect } from './sliderEffects.js';

const uploadImage = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const upLoadPreview = document.querySelector('.img-upload__preview');
const picturePreview = upLoadPreview.querySelector('img');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureOverlay = document.querySelector('.big-picture.overlay'); // Окно просмотра фото

uploadImage.addEventListener('click', () => {
  uploadImage.value = '';
  scaleImageSize.style.transform = 'scale(1)';
  fieldselEffectElement.classList.add('visually-hidden');
  applyingEffect.style.filter = '';
});

uploadImage.addEventListener('change', (event) => {
  const filePicture = event.target.files[0];

  if (event.target.files.length > 0) {
    const filePictureUrl = URL.createObjectURL(filePicture);

    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    picturePreview.src = filePictureUrl;

    effectsPreviewElements.forEach((element) => {
      element.style.backgroundImage = `url("${filePictureUrl}")`;
    });

    console.log('Обработчик Escape добавлен'); // Отладка
    document.addEventListener('keydown', closedonButton);
  }
});

const closeIcon = () => {
  if (uploadOverlay.classList.contains('hidden')) {
    return; // Если окно уже закрыто, ничего не делаем
  }

  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  if (picturePreviewEffects) {
    picturePreviewEffects.className = '';
  }

  const defaultRadio = document.querySelector('#effect-none');
  if (defaultRadio) {
    defaultRadio.checked = true;
    defaultRadio.focus();
  }

  // Закрытие большого изображения
  bigPictureOverlay.classList.add('hidden'); // Добавляем класс 'hidden' для закрытия

  // Удаляем обработчик клавиши Escape
  document.removeEventListener('keydown', closedonButton);
};

imageUploadCancel.addEventListener('click', closeIcon);
bigPictureCancel.addEventListener('click', closeIcon);

const hashtagItemClose = document.querySelector('.text__hashtags');
const descriptionItemClose = document.querySelector('.text__description');

let preventCloseHashtag = false;
let preventCloseDescription = false;

hashtagItemClose.addEventListener('focus', () => {
  preventCloseHashtag = true;
});
hashtagItemClose.addEventListener('blur', () => {
  preventCloseHashtag = false;
});

descriptionItemClose.addEventListener('focus', () => {
  preventCloseDescription = true;
});
descriptionItemClose.addEventListener('blur', () => {
  preventCloseDescription = false;
});

// Обработчик нажатия клавиши Escape
const closedonButton = (evt) => {
  if (evt.key === 'Escape' && !preventCloseHashtag && !preventCloseDescription) {
    console.log('Нажата клавиша Escape'); // Отладка
    closeIcon();
  }
};

export { uploadOverlay };
