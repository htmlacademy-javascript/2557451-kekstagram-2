// Константы
const sliderElement = document.querySelector('.effect-level__slider');
const effectFieldElement = document.querySelector('.img-upload__effect-level');
const effectRadios = document.querySelectorAll('.effects__radio');
const applyingEffectImage = document.querySelector('.img-upload__preview img');

// Фильтры эффектов
const effectFilters = {
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`
};

// Настройки слайдера для разных эффектов
const sliderOptions = {
  chrome: { min: 0, max: 1, step: 0.1, start: 1 },
  sepia: { min: 0, max: 1, step: 0.1, start: 1 },
  marvin: { min: 0, max: 100, step: 1, start: 100 },
  phobos: { min: 0, max: 3, step: 0.1, start: 3 },
  heat: { min: 1, max: 3, step: 0.1, start: 3 }
};

// Обновление настроек слайдера в зависимости от эффекта
const updateSlider = (effect) => {
  if (effect in sliderOptions) {
    sliderElement.noUiSlider.updateOptions({
      range: { min: sliderOptions[effect].min, max: sliderOptions[effect].max },
      start: sliderOptions[effect].start,
      step: sliderOptions[effect].step
    });
  }
};

// Обработчик изменения эффекта
const onEffectChange = (event) => {
  const selectedEffect = event.target.id.replace('effect-', '');
  if (selectedEffect === 'none') {
    effectFieldElement.classList.add('visually-hidden');
    applyingEffectImage.style.filter = '';
  } else {
    effectFieldElement.classList.remove('visually-hidden');
    updateSlider(selectedEffect);
  }
};

// Установка обработчиков изменения эффекта
effectRadios.forEach((radio) => {
  radio.addEventListener('change', onEffectChange);
});

// Создание слайдера
noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 1,
  step: 1,
  connect: 'lower',
});

// Обработчик для обновления эффекта на изображении
const onSliderUpdate = () => {
  const selectedRadio = document.querySelector('.effects__radio:checked').id.replace('effect-', '');
  const effectValue = sliderElement.noUiSlider.get();
  applyingEffectImage.style.filter = effectFilters[selectedRadio] ? effectFilters[selectedRadio](effectValue) : '';
};

// Добавление обработчика для слайдера
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { effectFieldElement, applyingEffectImage };
