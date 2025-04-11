const MAX_TAGS = 5;
const MAX_DESCRIPTION = 140;
const HASHTAG_FORMULA = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;

const photoUploadForm = document.querySelector('.img-upload__form');
const descriptionField = photoUploadForm.querySelector('.text__description');
const hashtagTag = photoUploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const getHashtags = (value) => value.trim().toLowerCase().split(/\s+/);

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag) => HASHTAG_FORMULA.test(hashtag));
};

const checkHashtagsCount = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.length < MAX_TAGS;
};

const checkHashtagUnique = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtags(value);
  const uniqueHashtags = [...new Set(hashtags)];
  return hashtags.length === uniqueHashtags.length;
}

const validateDescription = (value) => value.length <= MAX_DESCRIPTION;


pristine.addValidator(
  hashtagTag,
  validateHashtags,
  'Введён невалидный хэштег'
);

pristine.addValidator(
  hashtagTag,
  checkHashtagsCount,
  'превышено количество хэштегов'
);

pristine.addValidator(
  hashtagTag,
  checkHashtagUnique,
  'Хэштеги повторяются'
)

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Длина комментария больше 140 символов'
);

export { photoUploadForm, pristine }