'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var countCards = 8;

function getRandomValueFromList(list) {
  var rand = Math.floor(Math.random() * list.length);
  return list[rand];
}

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAdCard(index) {
  return {
    author: {
      avatar: 'img/avatars/user0' + ++index + '.png',
    },
    offer: {
      title: getRandomValueFromList(TITLES),
      address: getRandomValue(0, 1200) + ' , ' + getRandomValue(130, 630),
      price: getRandomValue(1000, 1000000),
      type: getRandomValueFromList(TYPES),
      rooms: getRandomValue(1, 5),
      guests: getRandomValue(1, 10),
      checkin: getRandomValueFromList(CHECKIN),
      checkout: getRandomValueFromList(CHECKOUT),
      features: getRandomValueFromList(FEATURES),
      description: '',
      photos: PHOTOS.sort(function () {
        return 0.5 - Math.random();
      }),
    },
    location: {
      x: getRandomValue(0, 1200),
      y: getRandomValue(130, 630),
    }
  };
}

function generateOfferList() {
  var list = [];
  for (var i = 0; i < countCards; i++) {
    list.push(createAdCard(i));
  }
  return list;
}

var listData = generateOfferList();
var map = document.querySelectorAll('.map')[0];

var getRemoveClass = function () {
  map.classList.remove('map--faded');
};
getRemoveClass();

var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');
var PIN_HEIGHT = 70;
var PIN_WEIGHT = 50;

for (var i = 0; i < listData.length; i++) {
  var element = template.cloneNode(true);

  element.style.left = listData[i].location.x - PIN_WEIGHT / 2 + 'px';
  element.style.top = listData[i].location.y + PIN_HEIGHT + 'px';
  element.querySelector('img').src = listData[i].author.avatar;
  mapPins.appendChild(element);
}

var mapFiltersContainer = document.querySelectorAll('map__filters-container')[0];
var templateCard = document.querySelector('#card').content.querySelector('article');
var elementCard = templateCard.cloneNode(true);
var firstCard = listData[0];

elementCard.querySelector('.popup__title').textContent = firstCard.offer.title;
elementCard.querySelector('.popup__text--price').textContent = firstCard.offer.price + '₽/ночь';
elementCard.querySelector('.popup__type').textContent = firstCard.offer.address;
elementCard.querySelector('.popup__text--capacity').textContent = firstCard.offer.rooms + ' комнаты' + ' для ' + firstCard .offer.guests + ' гостей';
elementCard.querySelector('.popup__text--time').textContent = 'Заезд ' + ' после ' + firstCard.offer.checkin + ' , ' + ' выезд ' + ' до ' + firstCard.offer.checkout;
elementCard.querySelector('.popup__description').textContent = firstCard.offer.description;
elementCard.querySelector('.popup__feature').textContent = firstCard.offer.features;

var popapPhotos = elementCard.querySelector('.popup__photos');
var popapPhoto = elementCard.querySelector('.popup__photo');

for (var j = 0; j < PHOTOS.length; j++) {
  var elementPhotos = popapPhoto.cloneNode(true);

  popapPhotos.appendChild(elementPhotos);
  elementCard.querySelector('.popup__photo').src = firstCard.offer.photos[j];
}
popapPhotos.removeChild(elementCard.querySelector('.popup__photo:nth-child(2)'));

elementCard.querySelector('.popup__avatar').src = firstCard.author.avatar;

var getType = function () {
  switch (firstCard.offer.type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
  return firstCard.offer.type;
};

elementCard.querySelector('.popup__text--address').textContent = getType();

map.insertBefore(elementCard, mapFiltersContainer);
