// Константы
const EFFECT_RADIO_ELEMENTS = document.querySelectorAll('.effects__radio');
const IMAGE_PREVIEW_ELEMENT = document.querySelector('.img-upload__preview img');

// Функции
const handleEffectChange = (evt) => {
  const selectedEffect = evt.target.value;
  IMAGE_PREVIEW_ELEMENT.className = ''; // Сбросить все классы

  if (selectedEffect !== 'none') {
    IMAGE_PREVIEW_ELEMENT.classList.add(`effects__preview--${selectedEffect}`);
  }
};

// Подключение обработчика событий
EFFECT_RADIO_ELEMENTS.forEach((radioElement) => {
  radioElement.addEventListener('change', handleEffectChange);
});

// Экспортируем неизменяемую переменную
export { IMAGE_PREVIEW_ELEMENT };
