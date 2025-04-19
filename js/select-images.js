const EFFECT_RADIO_ELEMENTS = document.querySelectorAll('.effects__radio');

const IMAGE_PREVIEW_ELEMENT = document.querySelector('.img-upload__preview img');


const handleEffectChange = (event) => {
  const selectedEffect = event.target.value;

  IMAGE_PREVIEW_ELEMENT.className = '';

  if (selectedEffect !== 'none') {
    IMAGE_PREVIEW_ELEMENT.classList.add(`effects__preview--${selectedEffect}`);
  }
};


EFFECT_RADIO_ELEMENTS.forEach((radio) => {
  radio.addEventListener('change', handleEffectChange);
});

export { IMAGE_PREVIEW_ELEMENT };
