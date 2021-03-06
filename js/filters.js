'use strict';
(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var disableFiltersForm = function () {
    window.helpers.addAttributeForOneElement(housingType, 'disabled');
    window.helpers.addAttributeForOneElement(housingPrice, 'disabled');
    window.helpers.addAttributeForOneElement(housingRooms, 'disabled');
    window.helpers.addAttributeForOneElement(housingGuests, 'disabled');
    window.helpers.addAttributeForOneElement(housingFeatures, 'disabled');
  };
  disableFiltersForm();

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

  var getFilteredArray = function () {
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
    var limitFiltredArray = filteredArray.slice(0, window.constans.PINS_NUMBER);
    return limitFiltredArray;
  };

  var addHandlerFilters = function () {
    mapFilters.onchange = window.helpers.debounce(function (evt) {
      var target = evt.target;
      if (target.tagName === 'FORM') {
        return;
      }
      removePins();
      var popup = document.querySelector('.popup');
      window.card.remove(popup);
      window.data.filteredListData = getFilteredArray();
      window.pin.create(window.data.filteredListData);
    });
  };
  window.filters = {
    housingFeatures: housingFeatures,
    removePins: removePins,
    addHandler: addHandlerFilters,
  };
})();
