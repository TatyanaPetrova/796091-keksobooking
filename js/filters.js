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
  // disableFiltersForm(housingType);
  // disableFiltersForm(housingFeatures);
  //disableFiltersForm(housingGuests);
  //disableFiltersForm(housingPrice);
  // disableFiltersForm(housingRooms);
  var adDataArray = [];
  // Копируем данные в массив
  var successHandler = function () {
    adDataArray.push.apply(adDataArray, window.data.listData);
  };
  successHandler();
  var onSelectRooms = function () {
    var rooms = document.querySelector('#housing-rooms').value;
    switch (rooms) {
      case '1':
        for (var i = 0; i < adDataArray.length; i++) {
          if (adDataArray[i].offer.rooms === 1) {
            console.log(adDataArray[i]);
            var adRoomFilter = [];
            adRoomFilter.push(adDataArray[i]);
            console.log(adRoomFilter);

            var removePins = function () {
              var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
              pins.forEach(function (pin) {
                pin.remove();
              });
            };
            removePins();
            window.pin.createPins(adRoomFilter);
          }
        }
    }
  };
  housingRooms.addEventListener('change', onSelectRooms);


  window.filters = {
    mapFilters: mapFilters,
  };
})();
