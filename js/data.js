let massiveDescriptionPhotos = [];

const NAMES = [
  'Алексей', 'Борис', 'Владимир', 'Григорий', 'Дмитрий',
  'Евгений', 'Жанна', 'Зоя', 'Иван', 'Кирилл',
  'Лариса', 'Марина', 'Наталья', 'Олег', 'Павел',
  'Роман', 'Светлана', 'Татьяна', 'Ульяна', 'Фёдор',
  'Харитон', 'Цезарь', 'Чеслав', 'Эльвира', 'Юрий'
];

const TEXT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
];

const TEXT_DESCRIPTION = [
  "Свежий кадр дня!",
  "Только что сделанное фото!",
  "Новый снимок в коллекции!",
  "Пойман момент!",
  "Ещё один шедевр на сегодня!",
  "Запечатлённый миг!",
  "Делюсь новым фото!",
  "Сегодняшний кадр для вас!",
  "Ещё один взгляд на мир!"
];

const createIdGenerator = () => {
  let counter = 0;
  let randomIdList = [];
  
  for (let k = 30; k <= 300; k++) {
    randomIdList.push(k);
  }

  return () => {
    let currentId = randomIdList[counter];
    counter++;
    return currentId;
  };
};

const randomValueComment = createIdGenerator();
const minLikes = 15;
const maxLikes = 200;
const minAvatars = 1;
const maxAvatars = 6;

export {
  massiveDescriptionPhotos, NAMES, TEXT_MESSAGES, TEXT_DESCRIPTION,
  randomValueComment, minLikes, maxLikes, minAvatars, maxAvatars
};