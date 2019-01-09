'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('article');
  var popapPhotos = templateCard.querySelector('.popup__photos');
  var popapPhoto = templateCard.querySelector('.popup__photo');
  var removeCard = function () {
    var oldCard = document.querySelector('.map__card');
    if (oldCard) {
      oldCard.parentNode.removeChild(oldCard);
    }
  };
  var сreateCards = function (index) {
    var firstCard = window.data.filteredListData ?
      window.data.filteredListData[index] :
      window.data.listData[index];
    templateCard.querySelector('.popup__title').textContent = firstCard.offer.title;
    templateCard.querySelector('.popup__text--price').textContent = firstCard.offer.price + '₽/ночь';
    templateCard.querySelector('.popup__type').textContent = firstCard.offer.address;
    templateCard.querySelector('.popup__text--capacity').textContent = firstCard.offer.rooms + ' комнаты' + ' для ' + firstCard.offer.guests + ' гостей';
    templateCard.querySelector('.popup__text--time').textContent = 'Заезд ' + ' после ' + firstCard.offer.checkin + ' , ' + ' выезд ' + ' до ' + firstCard.offer.checkout;
    templateCard.querySelector('.popup__description').textContent = firstCard.offer.description;

    var createFeatures = function () {
      var popupFeatures = templateCard.querySelector('.popup__features');
      popupFeatures.innerHTML = '';

      function createElementFeature(featureItem) {
        var elementFeature = document.createElement('li');
        elementFeature.classList.add('popup__feature');
        var className = featureItem;
        elementFeature.classList.add('popup__feature--' + className);
        popupFeatures.appendChild(elementFeature);
      }
      if (Array.isArray(firstCard.offer.features)) {
        for (var i = 0; i < firstCard.offer.features.length; i++) {
          createElementFeature(firstCard.offer.features[i]);
        }
      } else {
        createElementFeature(firstCard.offer.features);
      }
    };
    createFeatures();

    var сreatePhotos = function () {
      popapPhotos.innerHTML = '';
      for (var k = 0; k < firstCard.offer.photos.length; k++) {
        var elementPhotos = popapPhoto.cloneNode(true);
        popapPhotos.appendChild(elementPhotos);
        elementPhotos.src = firstCard.offer.photos[k];
      }
    };
    сreatePhotos();
    templateCard.querySelector('.popup__avatar').src = firstCard.author.avatar;

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

    templateCard.querySelector('.popup__text--address').textContent = getType();
    var elementCard = templateCard.cloneNode(true);
    removeCard();

    map.insertBefore(elementCard, mapFiltersContainer);
  };
  window.card = {
    map: map,
    сreateCards: сreateCards,
    removeCard: removeCard,
  };
})();
