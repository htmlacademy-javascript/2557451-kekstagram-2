// === Настройки масштаба ===
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

// === DOM-элементы ===
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

// === Вспомогательная функция ===
const getCurrentScale = () => parseInt(scaleValueInput.value, 10);

// === Масштабирование ===
const updateScale = (newScale) => {
  scaleValueInput.value = `${newScale}%`;
  imagePreviewElement.style.transform = `scale(${newScale / 100})`;
};

const increaseScale = () => {
  const current = getCurrentScale();
  if (current < MAX_SCALE) {
    updateScale(current + SCALE_STEP);
  }
};

const decreaseScale = () => {
  const current = getCurrentScale();
  if (current > MIN_SCALE) {
    updateScale(current - SCALE_STEP);
  }
};

// === События ===
scaleUpButton.addEventListener('click', increaseScale);
scaleDownButton.addEventListener('click', decreaseScale);

// === Экспорт ===
export { imagePreviewElement };
