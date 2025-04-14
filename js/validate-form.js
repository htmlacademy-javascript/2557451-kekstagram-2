const MAX_TAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;

const photoUploadFormElement = document.querySelector('.img-upload__form');
const descriptionFieldElement = photoUploadFormElement.querySelector('.text__description');
const hashtagFieldElement = photoUploadFormElement.querySelector('.text__hashtags');

// Инициализация валидатора с библиотекой Pristine
const pristineValidator = new Pristine(photoUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Функция для извлечения хэштегов
const extractHashtags = (value) => {
  return value.trim().toLowerCase().split(/\s+/);
};

// Валидатор для проверки корректности хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) return true; // Если поле пустое, возвращаем true
  const hashtags = extractHashtags(value);
  return hashtags.every((hashtag) => HASHTAG_PATTERN.test(hashtag)); // Проверяем каждый хэштег по регулярному выражению
};

// Валидатор для проверки количества хэштегов
const checkHashtagsCount = (value) => {
  if (!value.trim()) return true;
  const hashtags = extractHashtags(value);
  return hashtags.length <= MAX_TAGS_COUNT; // Проверяем, что количество хэштегов не превышает максимальное
};

// Валидатор для проверки уникальности хэштегов
const checkUniqueHashtags = (value) => {
  if (!value.trim()) return true;
  const hashtags = extractHashtags(value);
  const uniqueHashtags = [...new Set(hashtags)]; // Убираем повторяющиеся хэштеги
  return hashtags.length === uniqueHashtags.length; // Проверяем, что длина исходного массива совпадает с длиной массива без повторений
};

// Валидатор для проверки длины описания
const validateDescriptionLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

// Добавление валидаторов в Pristine
pristineValidator.addValidator(
  hashtagFieldElement,
  validateHashtags,
  'Введён невалидный хэштег'
);

pristineValidator.addValidator(
  hashtagFieldElement,
  checkHashtagsCount,
  `Превышено количество хэштегов (максимум ${MAX_TAGS_COUNT})`
);

pristineValidator.addValidator(
  hashtagFieldElement,
  checkUniqueHashtags,
  'Хэштеги повторяются'
);

pristineValidator.addValidator(
  descriptionFieldElement,
  validateDescriptionLength,
  `Длина комментария не должна превышать ${MAX_DESCRIPTION_LENGTH} символов`
);

export { photoUploadFormElement, pristineValidator };
