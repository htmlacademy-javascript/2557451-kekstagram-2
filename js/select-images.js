// === Константы ===

// Радиокнопки с эффектами
const EFFECT_RADIO_ELEMENTS = document.querySelectorAll('.effects__radio');

// Превью изображения, на которое применяются эффекты
const IMAGE_PREVIEW_ELEMENT = document.querySelector('.img-upload__preview img');

// === Функции ===

// Применение выбранного эффекта
const handleEffectChange = (event) => {
  const selectedEffect = event.target.value;

  // Удаляем все предыдущие классы
  IMAGE_PREVIEW_ELEMENT.className = '';

  // Добавляем новый класс, если эффект выбран
  if (selectedEffect !== 'none') {
    IMAGE_PREVIEW_ELEMENT.classList.add(`effects__preview--${selectedEffect}`);
  }
};

// === Инициализация ===

// Назначаем обработчик для каждого переключателя
EFFECT_RADIO_ELEMENTS.forEach((radio) => {
  radio.addEventListener('change', handleEffectChange);
});

// === Экспорт ===

export { IMAGE_PREVIEW_ELEMENT };
