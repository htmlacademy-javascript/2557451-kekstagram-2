const sliderElement = document.querySelector('.effect-level__slider');
const effectFieldElement = document.querySelector('.img-upload__effect-level');
const effectRadiosElements = document.querySelectorAll('.effects__radio');
const applyingEffectImageElement = document.querySelector('.img-upload__preview img');
const effectValueElement = document.querySelector('.effect-level__value');

const effectFilters = {
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`,
};

const sliderSettings = {
  chrome: { min: 0, max: 1, step: 0.1, start: 1 },
  sepia: { min: 0, max: 1, step: 0.1, start: 1 },
  marvin: { min: 0, max: 100, step: 1, start: 100 },
  phobos: { min: 0, max: 3, step: 0.1, start: 3 },
  heat: { min: 1, max: 3, step: 0.1, start: 3 },
};

const updateSlider = (effect) => {
  if (!sliderSettings[effect]) {
    return;
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: sliderSettings[effect].min,
      max: sliderSettings[effect].max,
    },
    start: sliderSettings[effect].start,
    step: sliderSettings[effect].step,
  });
};

const onSliderUpdate = () => {
  const effect = document.querySelector('.effects__radio:checked')?.id.replace('effect-', '');
  const value = sliderElement.noUiSlider.get();

  applyingEffectImageElement.style.filter = effectFilters[effect]?.(value) || '';
  effectValueElement.value = parseFloat(value);
};

const onEffectChange = (event) => {
  const effect = event.target.id.replace('effect-', '');

  if (effect === 'none') {
    applyingEffectImageElement.style.filter = '';
    effectFieldElement.classList.add('visually-hidden');
  } else {
    updateSlider(effect);
    effectFieldElement.classList.remove('visually-hidden');
  }
};

if (!sliderElement.noUiSlider) {
  noUiSlider.create(sliderElement, {
    range: { min: 0, max: 100 },
    start: 1,
    step: 1,
    connect: 'lower',
  });
}

effectFieldElement.classList.add('visually-hidden');

sliderElement.noUiSlider.on('update', onSliderUpdate);
effectRadiosElements.forEach((radio) => radio.addEventListener('change', onEffectChange));

const resetEffects = () => {
  document.querySelector('#effect-none').checked = true;
  applyingEffectImageElement.style.filter = '';
  applyingEffectImageElement.classList = '';
  effectFieldElement.classList.add('visually-hidden');
  sliderElement.noUiSlider.set(1);
  effectValueElement.value = '';
};

export { effectFieldElement, applyingEffectImageElement, resetEffects };
