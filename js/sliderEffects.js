const sliderElement = document.querySelector('.effect-level__slider');
const fieldselEffectElement = document.querySelector('.img-upload__effect-level');
const effectsRadios = document.querySelectorAll('.effects__radio');
const applyingEffect = document.querySelector('.img-upload__preview img')

const effectFilters = {
  'chrome': (value) => `grayscale(${value})`,
  'sepia': (value) => `sepia(${value})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value}px)`,
  'heat': (value) => `brightness(${value})`
};


const updateSlider = (effect) => {
  const sliderOptions = {
    'chrome': { min: 0, max: 1, step: 0.1, start: 1 },
    'sepia': { min: 0, max: 1, step: 0.1, start: 1 },
    'marvin': { min: 0, max: 100, step: 1, start: 100 },
    'phobos': { min: 0, max: 3, step: 0.1, start: 3 },
    'heat': { min: 1, max: 3, step: 0.1, start: 3 }
  };

  if (effect in sliderOptions) {
    sliderElement.noUiSlider.updateOptions({
      range: { min: sliderOptions[effect].min, max: sliderOptions[effect].max },
      start: sliderOptions[effect].start,
      step: sliderOptions[effect].step
    });
  }
}

effectsRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    if (radio.id == 'effect-none') {
      fieldselEffectElement.classList.add('visually-hidden');
      applyingEffect.style.filter = '';
    } else {
      fieldselEffectElement.classList.remove('visually-hidden');
      updateSlider(radio.id.replace('effect-', ''));
    }
  });
});

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 1,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  const selectRadio = document.querySelector('.effects__radio:checked').id.replace('effect-', '');
  const valueEffect = sliderElement.noUiSlider.get();
  applyingEffect.style.filter = effectFilters[selectRadio] ? effectFilters[selectRadio](valueEffect) : '';
});

export { fieldselEffectElement, applyingEffect }