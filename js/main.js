import {
  massiveDescriptionPhotos, NAMES, TEXT_MESSAGES, TEXT_DESCRIPTION,
  randomValueComment, minLikes, maxLikes, minAvatars, maxAvatars
}
  from './data.js';

let getPhotos = () => {

  for (let i = 0; i < 25; i++) {
    let randomValueLikes = Math.floor(Math.random() * (maxLikes - minLikes) + minLikes);
    let randomDescription = TEXT_DESCRIPTION[Math.floor(Math.random() * TEXT_DESCRIPTION.length)];

    let photo = {
      'id': i + 1,
      'url': `photos/${i + 1}.jpg`,
      'description': randomDescription,
      'likes': randomValueLikes,
      'comments': [],
    };

    for (let j = 0; j < Math.floor(Math.random() * 31); j++) {
      let randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      let randomMessage = TEXT_MESSAGES[Math.floor(Math.random() * TEXT_MESSAGES.length)];
      let randomAvatar = Math.floor(Math.random() * maxAvatars) + minAvatars;

      let comment = {
        'id': randomValueComment(),
        'avatar': `img/avatar-${randomAvatar}.svg`,
        'message': randomMessage,
        'name': randomName,
      };

      photo['comments'].push(comment);
    };

    massiveDescriptionPhotos.push(photo);
  }

  return massiveDescriptionPhotos;
}

console.log(JSON.stringify(getPhotos(), null, 2));