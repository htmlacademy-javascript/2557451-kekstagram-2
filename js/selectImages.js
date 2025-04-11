const switcherPictures = document.querySelectorAll('.effects__radio');
const picturePreviewEffects = document.querySelector('.img-upload__preview img');

switcherPictures.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    picturePreviewEffects.className = '';

    if(evt.target.value !== 'none') {
      picturePreviewEffects.classList.add(`effects__preview--${evt.target.value}`);
    }
  })
});

export { picturePreviewEffects }