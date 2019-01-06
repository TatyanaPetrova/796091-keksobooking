'use strict';
(function () {
  var PINS_NUMBER = 5;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  function disableFiltersForm(selector) {
    selector.setAttribute('disabled', 'disabled');
  }

  // Копируем данные в массив

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var getPrice = function (ad) {
    switch (housingPrice.value) {
      case 'low':
        return ad.offer.price < 10000;
      case 'middle':
        return ad.offer.price >= 10000 && ad.offer.price <= 50000;
      case 'high':
        return ad.offer.price > 50000;
      default:
        return true;
    }
  };

 /* var getFeatures = function (ad, ar) {
    if (!ar.length) {
      return true
    }
    for (var i = 0; i < ar.length; i++) {
      switch (ar[i].value) {
        case 'wifi':
          return ad.offer.features === 'wifi';
        case 'washer':
          return ad.offer.features === 'washer';
        case 'elevator':
          return ad.offer.features === 'elevator';
        case 'dishwasher':
          return ad.offer.features === 'dishwasher';
        case 'conditioner':
          return ad.offer.features === 'conditioner';
        case 'parking':
          return ad.offer.features === 'parking';
        default:
          return true;
      }
    }
  };
  console.log(getFeatures());
  */

  function getFilteredArray() {
    var adDataArray = window.data.listData.slice(0);
    var roomsValue = housingRooms.value;
    var houseTypeValue = housingType.value;
    var housePriceValue = housingPrice.value;
    var houseGuestsValue = housingGuests.value;
    var checkedFeatures = housingFeatures.querySelectorAll('input[type=checkbox]:checked');
    var filteredArray = adDataArray.filter(function (item) {
      return (roomsValue === 'any' ? true : item.offer.rooms == roomsValue) &&
        (housePriceValue === 'any' ? true :
          getPrice(item)) &&
        (houseTypeValue === 'any' ? true : item.offer.type == houseTypeValue) && (houseGuestsValue === 'any' ? true : item.offer.guests == houseGuestsValue);//(getFeatures(item, checkedFeatures));
    });
    return filteredArray;
  }

  mapFilters.onchange = function (evt) {
    var target = evt.target;
    if (target.tagName === 'FORM') {
      return;
    }
    removePins();
    window.pin.createPins(getFilteredArray());
    console.log(getFilteredArray());
  };

  window.filters = {
    mapFilters: mapFilters,
  };
})();
