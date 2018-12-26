'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('article');
  var elementCard = templateCard.cloneNode(true);
  var сreateCards = function (index) {
    var firstCard = window.data.listData[index];
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
      for (var j = 0; j < firstCard.offer.photos.length; j++) {
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
  window.card = {
    map: map,
    сreateCards: сreateCards
  };
})();
