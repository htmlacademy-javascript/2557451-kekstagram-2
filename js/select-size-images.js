// Константы
const MIN_SCALE_PERCENT = 25;
const MAX_SCALE_PERCENT = 100;
const SCALE_STEP = 25;

// Переменные
const decreaseSizeButtonElement = document.querySelector('.scale__control--smaller');
const increaseSizeButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

// Функции
const getCurrentScale = () => parseInt(scaleInputValueElement.value, 10);

// Обработчики событий
const onIncreaseSizeButtonClick = () => {
  let currentScale = getCurrentScale();
  if (currentScale < MAX_SCALE_PERCENT) {
    currentScale += SCALE_STEP;
    scaleInputValueElement.value = `${currentScale}%`;
    imagePreviewElement.style.transform = `scale(${currentScale / 100})`;
  }
};

const onDecreaseSizeButtonClick = () => {
  let currentScale = getCurrentScale();
  if (currentScale > MIN_SCALE_PERCENT) {
    currentScale -= SCALE_STEP;
    scaleInputValueElement.value = `${currentScale}%`;
    imagePreviewElement.style.transform = `scale(${currentScale / 100})`;
  }
};

// Добавление обработчиков событий
increaseSizeButtonElement.addEventListener('click', onIncreaseSizeButtonClick);
decreaseSizeButtonElement.addEventListener('click', onDecreaseSizeButtonClick);

// Экспорт
export { imagePreviewElement };
