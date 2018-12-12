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
var PIN_MAIN_LOCATION_X_MIN = 0;
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 84;
var config = {
  type: {
    price: {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000,
    }
  }
};

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

var removeClass = function (selector, classDelete) {
  selector.classList.remove(classDelete);
};

var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');

var сreatePins = function () {
  for (var i = 0; i < listData.length; i++) {
    var element = template.cloneNode(true);

    element.style.left = listData[i].location.x - PIN_WEIGHT / 2 + 'px';
    element.style.top = listData[i].location.y + PIN_HEIGHT + 'px';
    element.querySelector('img').src = listData[i].author.avatar;
    mapPins.appendChild(element);
  }
};
сreatePins();

var mapFiltersContainer = document.querySelectorAll('map__filters-container')[0];
var templateCard = document.querySelector('#card').content.querySelector('article');
var elementCard = templateCard.cloneNode(true);
var firstCard = listData[0];

var сreateCards = function () {
  elementCard.querySelector('.popup__title').textContent = firstCard.offer.title;
  elementCard.querySelector('.popup__text--price').textContent = firstCard.offer.price + '₽/ночь';
  elementCard.querySelector('.popup__type').textContent = firstCard.offer.address;
  elementCard.querySelector('.popup__text--capacity').textContent = firstCard.offer.rooms + ' комнаты' + ' для ' + firstCard.offer.guests + ' гостей';
  elementCard.querySelector('.popup__text--time').textContent = 'Заезд ' + ' после ' + firstCard.offer.checkin + ' , ' + ' выезд ' + ' до ' + firstCard.offer.checkout;
  elementCard.querySelector('.popup__description').textContent = firstCard.offer.description;
  elementCard.querySelector('.popup__feature').textContent = firstCard.offer.features;

  var popapPhotos = elementCard.querySelector('.popup__photos');
  var popapPhoto = elementCard.querySelector('.popup__photo');

  var сreatePhotos = function () {
    for (var j = 0; j < PHOTOS.length; j++) {
      var elementPhotos = popapPhoto.cloneNode(true);

      popapPhotos.appendChild(elementPhotos);
      elementCard.querySelector('.popup__photo').src = firstCard.offer.photos[j];
    }
    popapPhotos.removeChild(elementCard.querySelector('.popup__photo:nth-child(2)'));
  };
  сreatePhotos();

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
сreateCards();

//  Добавляем атрибут disabled

var input = document.querySelectorAll('input');
var select = document.querySelectorAll('select');
var textarea = document.querySelectorAll('textarea');
var buttonFormSubmit = document.querySelector('.ad-form__submit');
var buttonFormReset = document.querySelector('.ad-form__reset');
var inputAddress = document.querySelector('#address');

var addAttribute = function (selector, attribute) {
  for (var i = 0; i < selector.length; i++) {
    selector[i].setAttribute(attribute, attribute);
  }
};

addAttribute(input, 'disabled');
addAttribute(select, 'disabled');
addAttribute(textarea, 'disabled');
addAttribute(buttonFormSubmit, 'disabled');
addAttribute(buttonFormReset, 'disabled');

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');

var onMapPinMainClick = function () {
  removeClass(map, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');

  var deleteAttribute = function (selector) {
    for (var i = 0; i < selector.length; i++) {
      selector[i].disabled = false;
    }
  };
  deleteAttribute(input);
  deleteAttribute(select);
  deleteAttribute(textarea);
  deleteAttribute(buttonFormSubmit);
  deleteAttribute(buttonFormReset);
};
var addValue = function (selector) {
  selector.setAttribute('value', ((SCREEN_WIDTH / 2) +
    ' ; ' + (SCREEN_HEIGHT / 2)));
};
addValue(inputAddress);

var mapCard = document.querySelectorAll('.map__card');

var hideElement = function (selector, classAdd) {
  for (var i = 0; i < selector.length; i++) {
    selector[i].classList.add(classAdd);
  }
};
hideElement(mapCard, 'hidden');

mapPinMain.addEventListener('click', onMapPinMainClick);

mapPins.onclick = function (evt) {
  var target = evt.target.closest('button');
  if (!target || target.classList.contains('map__pin--main')) {
    return;
  }
  var removeManyClass = function (selector, classDelete) {
    for (var i = 0; i < selector.length; i++) {
      selector[i].classList.remove(classDelete);
    }
  };
  removeManyClass(mapCard, 'hidden');
};

var popup = document.querySelector('.popup');

popup.onclick = function (evt) {
  var target = evt.target.closest('button');
  if (!target) {
    return;
  }
  hideElement(mapCard, 'hidden');
};

//  связь типа жилья и цены

var adTypeSelect = document.querySelector('#type');
var housePrise = document.querySelector('#price');

var onSelectType = function () {
  var adType = document.querySelector('#type').value;
  switch (adType) {
    case 'bungalo':
      housePrise.value = config.type.price.bungalo;
      break;
    case 'flat':
      housePrise.value = config.type.price.flat;
      break;
    case 'house':
      housePrise.value = config.type.price.house;
      break;
    case 'palace':
      housePrise.value = config.type.price.palace;
      break;
  }
  return adType;
};

adTypeSelect.addEventListener('change', onSelectType);

//  связь времени заезада и выезда

var timeOutSelect = document.querySelector('#timeout');
var timeInSelect = document.querySelector('#timein');

var onSelectTimeOut = function () {
  var timeInValue = document.querySelector('#timein').value;
  switch (timeInValue) {
    case CHECKIN[0]:
      timeOutSelect.value = CHECKOUT[0];
      break;
    case CHECKIN[1]:
      timeOutSelect.value = CHECKOUT[1];
      break;
    case CHECKIN[2]:
      timeOutSelect.value = CHECKOUT[2];
      break;
  }
  return timeInValue;
};

timeInSelect.addEventListener('change', onSelectTimeOut);

var onSelectTimeIn = function () {
  var timeOutValue = document.querySelector('#timeout').value;
  switch (timeOutValue) {
    case CHECKOUT[0]:
      timeInSelect.value = CHECKIN[0];
      break;
    case CHECKOUT[1]:
      timeInSelect.value = CHECKIN[1];
      break;
    case CHECKOUT[2]:
      timeInSelect.value = CHECKIN[2];
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

var movePin = function () {
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var finishCoordsX = (mapPinMain.offsetLeft - shift.x);
      var finishCoordsY = (mapPinMain.offsetTop - shift.y);

      var correctCoordX = finishCoordsX > PIN_MAIN_LOCATION_X_MIN - PIN_MAIN_WIDTH / 2 && finishCoordsX < SCREEN_WIDTH - PIN_MAIN_WIDTH / 2;

      var correctCoordY = finishCoordsY > REFERENCE_POINT_HEIGHT - PIN_MAIN_HEIGHT && finishCoordsY < SCREEN_HEIGHT - PIN_MAIN_HEIGHT;

      if (correctCoordX) {
        mapPinMain.style.left = finishCoordsX + 'px';
        var inputAdressCoordX = finishCoordsX;
      }

      if (correctCoordY) {
        mapPinMain.style.top = finishCoordsY + 'px';
        var inputAdressCoordY = finishCoordsY;
      }

      inputAddress.value = (inputAdressCoordX + ' ; ' + inputAdressCoordY);

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
};
movePin();
