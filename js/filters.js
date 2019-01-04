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
  };

  // disableFiltersForm(housingType);
  // disableFiltersForm(housingFeatures);
  //disableFiltersForm(housingGuests);
  //disableFiltersForm(housingPrice);
  // disableFiltersForm(housingRooms);

  // Копируем данные в массив
  var adDataArray = window.data.listData.slice(0);
  //Функция фильтрации массива
  var getArrayFiltredRooms = function (it) {
    var filterRooms = adDataArray.filter(function (item) {
      return (item.offer.rooms === it);
    });
    console.log(filterRooms);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var onSelectRooms = function () {
    var rooms = document.querySelector('#housing-rooms').value;
    switch (rooms) {
      case '1':
        getArrayFiltredRooms(1);
        removePins();
        window.pin.createPins(getArrayFiltredRooms(1));
    }
  };
  housingRooms.addEventListener('change', onSelectRooms);


  window.filters = {
    mapFilters: mapFilters,
  };
})();
