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



var mapPins = document.querySelectorAll('.map__pins');
console.log(mapPins);

var template = document.querySelector('#pin').content.querySelector('button');

console.log(template);

for (var i = 0; i < 8; i++) {
  var element = template.cloneNode(true);
  console.log(element);
  mapPins.appendChild(element);
}
