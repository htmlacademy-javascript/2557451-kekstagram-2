const effectRadioElements = document.querySelectorAll('.effects__radio');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const onEffectChange = (event) => {
  const selectedEffect = event.target.value;

  imagePreviewElement.className = '';

  if (selectedEffect !== 'none') {
    imagePreviewElement.classList.add(`effects__preview--${selectedEffect}`);
  }
};

effectRadioElements.forEach((radio) => {
  radio.addEventListener('change', onEffectChange);
});

export { imagePreviewElement };
