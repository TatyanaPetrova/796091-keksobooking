'use strict';
(function () {
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
  var map = document.querySelector('.map');
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var textarea = document.querySelector('textarea');
  var buttonFormSubmit = document.querySelector('.ad-form__submit');
  var buttonFormReset = document.querySelector('.ad-form__reset');
  var inputAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');

  var addFormAttributeDisabled = function () {
    window.helpers.addAttribute(inputs, 'disabled');
    window.helpers.addAttribute(selects, 'disabled');
    window.helpers.addAttributeForOneElement(buttonFormSubmit, 'disabled');
    window.helpers.addAttributeForOneElement(buttonFormReset, 'disabled');
    window.helpers.addAttributeForOneElement(textarea, 'disabled');
  };
  addFormAttributeDisabled();
  window.helpers.addValue(inputAddress, ('"' + (window.data.SCREEN_WIDTH / 2) +
    ' , ' + (window.data.SCREEN_HEIGHT / 2) + '"'));
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
      case window.data.copyCheckin[0]:
        timeOutSelect.value = window.data.copyCheckout[0];
        break;
      case window.data.copyCheckin[1]:
        timeOutSelect.value = window.data.copyCheckout[1];
        break;
      case window.data.copyCheckin[2]:
        timeOutSelect.value = window.data.copyCheckout[2];
        break;
    }
    return timeInValue;
  };

  timeInSelect.addEventListener('change', onSelectTimeOut);

  var onSelectTimeIn = function () {
    var timeOutValue = document.querySelector('#timeout').value;
    switch (timeOutValue) {
      case window.data.copyCheckout[0]:
        timeInSelect.value = window.data.copyCheckin[0];
        break;
      case window.data.copyCheckout[1]:
        timeInSelect.value = window.data.copyCheckin[1];
        break;
      case window.data.copyCheckout[2]:
        timeInSelect.value = window.data.copyCheckin[2];
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

  //  Отправка формы
  var main = document.querySelector('main');
  var body = document.querySelector('body');

  var onSuccess = function () {
    addFormAttributeDisabled();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.card.removeCard();
    window.pin.mapPinMain.style.left = window.pin.PIN_COORD_LEFT_DEFAULT;
    window.pin.mapPinMain.style.top = window.pin.PIN_COORD_TOP_DEFAULT;
    var hiddenPins = function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.classList.add('hidden');
      });
    };
    hiddenPins();


    var successMessage = document.querySelector('#success').content.querySelector('div');
    body.insertBefore(successMessage, main);
    var onSuccessMessageClick = function () {
      body.removeChild(successMessage);
    };
    body.addEventListener('click', onSuccessMessageClick);
  };

  var onError = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('div');
    body.insertBefore(errorMessage, main);
    var onErrorMessageClick = function () {
      body.removeChild(errorMessage);
    };
    body.addEventListener('click', onErrorMessageClick);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upLoad(formData, onSuccess, onError);
    adForm.reset();

  });

  window.form = {
    adForm: adForm,
    inputs: inputs,
    selects: selects,
    textarea: textarea,
    buttonFormSubmi: buttonFormSubmit,
    buttonFormReset: buttonFormReset,
    inputAddress: inputAddress,
  };
})();
