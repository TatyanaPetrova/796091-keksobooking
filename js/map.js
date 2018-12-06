'use strict';

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
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_NUMBER = 1;
var MAX_ROOMS = 5;
var MAX_GUEST = 10;
var PIN_HEIGHT = 70;
var PIN_WEIGHT = 50;

var copyPhotos = PHOTOS.slice();
var map = document.querySelector('.map');

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
}

function generateOfferList() {
  var list = [];
  for (var i = 0; i < COUNT_CARDS; i++) {
    list.push(createAdCard(i));
  }
  return list;
}

var listData = generateOfferList();

var getRemoveClass = function (selector, classDelete) {
  selector.classList.remove(classDelete);
};

var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');

var getCreatePins = function () {
  for (var i = 0; i < listData.length; i++) {
    var element = template.cloneNode(true);

    element.style.left = listData[i].location.x - PIN_WEIGHT / 2 + 'px';
    element.style.top = listData[i].location.y + PIN_HEIGHT + 'px';
    element.querySelector('img').src = listData[i].author.avatar;
    mapPins.appendChild(element);
  }
};
getCreatePins();

var mapFiltersContainer = document.querySelectorAll('map__filters-container')[0];
var templateCard = document.querySelector('#card').content.querySelector('article');
var elementCard = templateCard.cloneNode(true);
var firstCard = listData[0];

var getCreateCards = function () {
  elementCard.querySelector('.popup__title').textContent = firstCard.offer.title;
  elementCard.querySelector('.popup__text--price').textContent = firstCard.offer.price + '₽/ночь';
  elementCard.querySelector('.popup__type').textContent = firstCard.offer.address;
  elementCard.querySelector('.popup__text--capacity').textContent = firstCard.offer.rooms + ' комнаты' + ' для ' + firstCard.offer.guests + ' гостей';
  elementCard.querySelector('.popup__text--time').textContent = 'Заезд ' + ' после ' + firstCard.offer.checkin + ' , ' + ' выезд ' + ' до ' + firstCard.offer.checkout;
  elementCard.querySelector('.popup__description').textContent = firstCard.offer.description;
  elementCard.querySelector('.popup__feature').textContent = firstCard.offer.features;

  var popapPhotos = elementCard.querySelector('.popup__photos');
  var popapPhoto = elementCard.querySelector('.popup__photo');

  var getCreatePhotos = function () {
    for (var j = 0; j < PHOTOS.length; j++) {
      var elementPhotos = popapPhoto.cloneNode(true);

      popapPhotos.appendChild(elementPhotos);
      elementCard.querySelector('.popup__photo').src = firstCard.offer.photos[j];
    }
    popapPhotos.removeChild(elementCard.querySelector('.popup__photo:nth-child(2)'));
  };
  getCreatePhotos();

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
};
getCreateCards();

//  Добавляем атрибут disabled

var input = document.querySelectorAll('input');
var select = document.querySelectorAll('select');
var textarea = document.querySelectorAll('textarea');
var buttonFormSubmit = document.querySelectorAll('.ad-form__submit');
var buttonFormReset = document.querySelectorAll('.ad-form__reset');
var inputAddress = document.getElementById('address');

var getDisabledfunction = function (selector) {
  for (var i = 0; i < selector.length; i++) {
    selector[i].setAttribute('disabled', 'disabled');
  }
};

getDisabledfunction(input);
getDisabledfunction(select);
getDisabledfunction(textarea);
getDisabledfunction(buttonFormSubmit);
getDisabledfunction(buttonFormReset);

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');

var onMapPinMainClick = function () {
  getRemoveClass(map, 'map--faded');
  getRemoveClass(adForm, 'ad-form--disabled');

  var getDeleteDisabled = function (selector) {
    for (var i = 0; i < selector.length; i++) {
      selector[i].disabled = false;
    }
  };
  getDeleteDisabled(input);
  getDeleteDisabled(select);
  getDeleteDisabled(textarea);
  getDeleteDisabled(buttonFormSubmit);
  getDeleteDisabled(buttonFormReset);

};

var onMapPinMouseUp = function () {
  var getAddValue = function (selector) {
    selector.setAttribute('value', ((SCREEN_WIDTH / 2) +
      ' ; ' + (SCREEN_HEIGHT / 2)));
  };
  getAddValue(inputAddress);
};


var mapPin = document.querySelectorAll('.map__pin');
var mapCard = document.querySelectorAll('.map__card');

var getHideElement = function (selector, classAdd) {
  for (var i = 0; i < selector.length; i++) {
    selector[i].classList.add(classAdd);
  }
};
getHideElement(mapCard, 'hidden');

var onMapPinClick = function () {

  var getRemoveManyClass = function (selector, classDelete) {
    for (var i = 0; i < selector.length; i++) {
      selector[i].classList.remove(classDelete);
    }
  };
  getRemoveManyClass(mapCard, 'hidden');
};

var popupClose = document.querySelectorAll('.popup__close');
var getControlClick = function () {
  var onButtonPopupCloseClick = function () {
    getHideElement(mapCard, 'hidden');
  };

  mapPinMain.addEventListener('click', onMapPinMainClick);
  mapPinMain.addEventListener('mouseup', onMapPinMouseUp);

  var getControlClickMapPin = function () {
    for (var i = 1; i < mapPin.length; i++) {
      mapPin[i].addEventListener('click', onMapPinClick);
    }
  };
  getControlClickMapPin();
  var getControlClickPopupClose = function () {
    for (var i = 0; i < popupClose.length; i++) {
      popupClose[i].addEventListener('click', onButtonPopupCloseClick);
    }
  };
  getControlClickPopupClose();
};
getControlClick();

//  связь типа жилья и цены

var adTypeSelect = document.querySelector('#type');
var housePrise = document.querySelector('#price');

var onSelectType = function () {
  var adType = document.querySelector('#type').value;
  switch (adType) {
    case 'bungalo':
      housePrise.value = '0';
      break;
    case 'flat':
      housePrise.value = '1000';
      break;
    case 'house':
      housePrise.value = '5000';
      break;
    case 'palace':
      housePrise.value = '10000';
      break;
  }
  return adType;
};

adTypeSelect.addEventListener('change', onSelectType);

inputAddress.setAttribute('disabled', 'disabled');

//  связь времени заезада и выезда

var timeOutSelect = document.querySelector('#timeout');
var timeInSelect = document.querySelector('#timein');

var onSelectTimeOut = function () {
  var timeInValue = document.querySelector('#timein').value;
  switch (timeInValue) {
    case '12:00':
      timeOutSelect.value = '12:00';
      break;
    case '13:00':
      timeOutSelect.value = '13:00';
      break;
    case '14:00':
      timeOutSelect.value = '14:00';
      break;
  }
  return timeInValue;
};

timeInSelect.addEventListener('change', onSelectTimeOut);

var onSelectTimeIn = function () {
  var timeOutValue = document.querySelector('#timeout').value;
  switch (timeOutValue) {
    case '12:00':
      timeInSelect.value = '12:00';
      break;
    case '13:00':
      timeInSelect.value = '13:00';
      break;
    case '14:00':
      timeInSelect.value = '14:00';
      break;
  }
  return timeOutValue;
};

timeOutSelect.addEventListener('change', onSelectTimeIn);

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var onSelectRoomNumber = function () {
  var roomNumberValue = document.querySelector('#room_number').value;
  switch (roomNumberValue) {
    case '1':
      capacity.value = '1';
      capacity.options.length = 0;
      capacity.options[capacity.options.length] = new Option('для 1 гостя', '1');
      break;
    case '2':
      capacity.options.length = 0;
      capacity.options[capacity.options.length] = new Option('для 1 гостя', '1');
      capacity.options[capacity.options.length] = new Option('для 2 гостей', '2');
      capacity.value = '2';
      break;
    case '3':
      capacity.options.length = 0;
      capacity.options[capacity.options.length] = new Option('для 1 гостя', '1');
      capacity.options[capacity.options.length] = new Option('для 2 гостей', '2');
      capacity.options[capacity.options.length] = new Option('для 3 гостей', '3');
      capacity.value = '3';
      break;
    case '100':
      capacity.options.length = 0;
      capacity.options[capacity.options.length] = new Option('не для гостей', '0');
      break;
  }
  return roomNumberValue;
};

roomNumber.addEventListener('change', onSelectRoomNumber);
