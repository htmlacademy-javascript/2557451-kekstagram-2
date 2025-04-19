const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const getCurrentScale = () => parseInt(scaleValueInput.value, 10);

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

scaleUpButton.addEventListener('click', increaseScale);
scaleDownButton.addEventListener('click', decreaseScale);

export { imagePreviewElement };
