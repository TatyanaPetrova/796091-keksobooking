'use strict';
(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var COUNT_CARDS = 8;
  var SCREEN_WIDTH = 1200;
  var SCREEN_HEIGHT = 630;
  var REFERENCE_POINT_HEIGHT = 130;
  var PIN_HEIGHT = 70;
  var PIN_WEIGHT = 50;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_NUMBER = 1;
  var MAX_ROOMS = 5;
  var MAX_GUEST = 10;
  var copyPhotos = PHOTOS.slice();
  var copyCheckout = CHECKOUT.slice();
  var copyCheckin = CHECKIN.slice();
  var numberPhotos = PHOTOS.length;

  var getRandomValueFromList = function (list) {
    var rand = Math.floor(Math.random() * list.length);
    return list[rand];
  };

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createAdCard = function (index) {
    return {
      author: {
        avatar: 'img/avatars/user0' + ++index + '.png',
      },
      offer: {
        title: getRandomValueFromList(TITLES),
        address: getRandomValue(0, SCREEN_WIDTH) + ' , ' + getRandomValue(REFERENCE_POINT_HEIGHT, SCREEN_HEIGHT - PIN_HEIGHT),
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
        type: getRandomValueFromList(TYPES),
        rooms: getRandomValue(MIN_NUMBER, MAX_ROOMS),
        guests: getRandomValue(MIN_NUMBER, MAX_GUEST),
        checkin: getRandomValueFromList(CHECKIN),
        checkout: getRandomValueFromList(CHECKOUT),
        features: getRandomValueFromList(FEATURES),
        description: '',
        photos: copyPhotos.sort(function () {
          return 0.5 - Math.random();
        }),
      },
      location: {
        x: getRandomValue(0, SCREEN_WIDTH),
        y: getRandomValue(REFERENCE_POINT_HEIGHT, SCREEN_HEIGHT - PIN_HEIGHT),
      }
    };
  };

  var generateOfferList = function () {
    var list = [];
    for (var i = 0; i < COUNT_CARDS; i++) {
      list.push(createAdCard(i));
    }
    return list;
  };

  var listData = generateOfferList();
  window.data = {
    listdata: listData,
    namberPhotos: numberPhotos,
    SCREEN_WIDTH: SCREEN_WIDTH,
    SCREEN_HEIGHT: SCREEN_HEIGHT,
    copyCheckout: copyCheckout,
    copyCheckin: copyCheckin,
    PIN_WEIGHT: PIN_WEIGHT,
    PIN_HEIGHT: PIN_HEIGHT,
    REFERENCE_POINT_HEIGHT: REFERENCE_POINT_HEIGHT
  };
})();
