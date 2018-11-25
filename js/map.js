'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


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
      address: '{{location.x}}, {{location.y}}',
      price: getRandomValue(1000, 1000000),
      type: getRandomValueFromList(TYPES),
      rooms: getRandomValue(1, 5),
      guests: getRandomValue(1, 10),
      checkin: getRandomValueFromList(CHECKIN),
      checkout: getRandomValueFromList(CHECKOUT),
      features: getRandomValueFromList(FEATURES),
      description: '',
      photos: PHOTOS.sort(function (a, b) {
        return 0.5 - Math.random()
      }),
    },
    location: {
      x: getRandomValue(0, 1200),
      y: getRandomValue(130, 630),
    }
  }
}

function generateOfferList() {
  var list = [];


  for (var i = 0; i < 8; i++) {
    list.push(createAdCard(i))
  }

  return list;
}

var listData = generateOfferList()

console.log(listData);

var getRemoveClass = function () {
  var map = document.getElementsByClassName('map')[0];
  map.classList.remove('map--faded');
}
console.log(getRemoveClass());



var mapPins = document.querySelector('.map__pins');
console.log(mapPins);

var template = document.querySelector('#pin').content.querySelector('button');
var PIN_HEIGHT = 70;
var PIN_WEIGHT = 50;

console.log(template);

for (var i = 0; i < listData.length; i++) {
  var element = template.cloneNode(true);
  console.log(element);
  element.style.left = listData[i].location.x - PIN_WEIGHT / 2 + 'px';
  element.style.top = listData[i].location.y + PIN_HEIGHT + 'px';
  element.querySelector('img').src = listData[i].author.avatar;
  mapPins.appendChild(element);
}

var map = document.getElementsByClassName('map')[0];
console.log(map);
var mapFiltersContainer = document.getElementsByClassName('map__filters-container')[0];
var templateCard = document.querySelector('#card').content.querySelector('article');
console.log(templateCard)

for (var i = 0; i < listData.length; i++) {
  var elementCard = templateCard.cloneNode(true);
  console.log(elementCard);

  elementCard.querySelector('.popup__title').textContent = listData[i].offer.title;

  elementCard.querySelector('.popup__text--price').textContent = listData[i].offer.price + '₽/ночь';

  elementCard.querySelector('.popup__type').textContent = listData[i].offer.address;

  elementCard.querySelector('.popup__text--address').textContent = listData[i].offer.type;

  elementCard.querySelector('.popup__text--capacity').textContent = listData[i].offer.rooms + ' комнаты' + ' для ' + listData[i].offer.guests + ' гостей';

  elementCard.querySelector('.popup__text--time').textContent = 'Заезд ' + ' после ' + listData[i].offer.checkin + ' , ' + ' выезд ' + ' до ' + listData[i].offer.checkout;

  elementCard.querySelector('.popup__description').textContent = listData[i].offer.description;

  elementCard.querySelector('.popup__feature').textContent = listData[i].offer.features;

  elementCard.querySelector('.popup__feature').textContent = listData[i].offer.features;

  var popapPhotos = elementCard.querySelector('.popup__photos');
  var popapPhoto = elementCard.querySelector('.popup__photo');

  for (var j = 0; j < PHOTOS.length; j++) {
    var elementPhotos = popapPhoto.cloneNode(true);
    console.log(elementPhotos);
    popapPhotos.appendChild(elementPhotos);

    elementCard.querySelector('.popup__photo').src = listData[i].offer.photos[j];
  };
  
  elementCard.querySelector('.popup__avatar').src = listData[i].author.avatar;

  map.insertBefore(elementCard, mapFiltersContainer);

}
