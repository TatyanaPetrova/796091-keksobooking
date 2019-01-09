'use strict';
(function () {
  var PINS_NUMBER = 5;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var DEBOUNCE_INTERVAL = 500; // ms
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  function disableFiltersForm() {
    window.helpers.addAttributeForOneElement(housingType, 'disabled');
    window.helpers.addAttributeForOneElement(housingPrice, 'disabled');
    window.helpers.addAttributeForOneElement(housingRooms, 'disabled');
    window.helpers.addAttributeForOneElement(housingGuests, 'disabled');
    window.helpers.addAttributeForOneElement(housingFeatures, 'disabled');
  }
  disableFiltersForm();

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var getPrice = function (ad) {
    switch (housingPrice.value) {
      case 'low':
        return ad.offer.price < LOW_PRICE;
      case 'middle':
        return ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE;
      case 'high':
        return ad.offer.price > HIGH_PRICE;
      default:
        return true;
    }
  };

  var getFeatures = function (ad, arrayCheckedFeatures) {
    return Array.from(arrayCheckedFeatures).every(function (element) {
      return ad.offer.features.includes(element.value);
    });
  };

  function getFilteredArray() {
    var adDataArray = window.data.listData.slice(0);
    var roomsValue = housingRooms.value;
    var houseTypeValue = housingType.value;
    var housePriceValue = housingPrice.value;
    var houseGuestsValue = housingGuests.value;
    var checkedFeatures = housingFeatures.querySelectorAll('input[type=checkbox]:checked');
    var filteredArray = adDataArray.filter(function (item) {
      return (roomsValue === 'any' ? true : item.offer.rooms + '' === roomsValue) &&
        (housePriceValue === 'any' ? true :
          getPrice(item)) &&
        (houseTypeValue === 'any' ? true : item.offer.type + '' === houseTypeValue) && (houseGuestsValue === 'any' ? true : item.offer.guests + '' === houseGuestsValue) && (getFeatures(item, checkedFeatures));
    });
    var limitFiltredArray = filteredArray.slice(0, PINS_NUMBER);
    return limitFiltredArray;
  }

  mapFilters.onchange = window.debounce(function (evt) {
    var target = evt.target;
    if (target.tagName === 'FORM') {
      return;
    }
    removePins();
    window.data.filteredListData = getFilteredArray();
    window.pin.createPins(window.data.filteredListData);
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.parentNode.removeChild(popup);
    }
  });

  window.filters = {
    mapFilters: mapFilters,
    housingFeatures: housingFeatures,
    removePins: removePins,
  };
})();
