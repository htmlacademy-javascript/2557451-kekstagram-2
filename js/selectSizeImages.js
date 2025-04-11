const decreaseSizeButton = document.querySelector('.scale__control--smaller');
const increaseSizeButton = document.querySelector('.scale__control--bigger');
const inputValueSize = document.querySelector('.scale__control--value');
const scaleImageSize = document.querySelector('.img-upload__preview img');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;

let getCurrentScale = () => parseInt(inputValueSize.value, 10);

increaseSizeButton.addEventListener('click', () => {
  let currentScale = getCurrentScale();
  if (currentScale < MAX_SCALE) {
    currentScale += STEP;
    inputValueSize.value = `${currentScale}%`;
    scaleImageSize.style.transform = `scale(${currentScale / 100})`;
  }
});

decreaseSizeButton.addEventListener('click', () => {
  let currentScale = getCurrentScale();
  console.log(currentScale);
  if (currentScale > MIN_SCALE) {
    currentScale -= STEP;
    console.log(currentScale);
    inputValueSize.value = `${currentScale}%`;
    scaleImageSize.style.transform = `scale(${currentScale / 100})`;
  }
});

export { scaleImageSize }

