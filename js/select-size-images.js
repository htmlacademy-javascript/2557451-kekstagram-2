const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const scaleDownButtonElement = document.querySelector('.scale__control--smaller');
const scaleUpButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const getCurrentScale = () => parseInt(scaleValueInputElement.value, 10);

const updateScale = (newScale) => {
  scaleValueInputElement.value = `${newScale}%`;
  imagePreviewElement.style.transform = `scale(${newScale / 100})`;
};

const onScaleIncrease = () => {
  const current = getCurrentScale();
  if (current < MAX_SCALE) {
    updateScale(current + SCALE_STEP);
  }
};

const onScaleDecrease = () => {
  const current = getCurrentScale();
  if (current > MIN_SCALE) {
    updateScale(current - SCALE_STEP);
  }
};

scaleUpButtonElement.addEventListener('click', onScaleIncrease);
scaleDownButtonElement.addEventListener('click', onScaleDecrease);

export { imagePreviewElement };
