'use strict';
(function () {
  var AVATAR = 'img/muffin-grey.svg';
  var Config = {
    Type: {
      Price: {
        BUNGALO: 0,
        FLAT: 1000,
        HOUSE: 5000,
        PALACE: 10000,
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

  var hidePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.classList.add('hidden');
    });
  };

  var addFormAttributeDisabled = function () {
    window.helpers.addAttribute(inputs, 'disabled');
    window.helpers.addAttribute(selects, 'disabled');
    window.helpers.addAttributeForOneElement(buttonFormSubmit, 'disabled');
    window.helpers.addAttributeForOneElement(buttonFormReset, 'disabled');
    window.helpers.addAttributeForOneElement(textarea, 'disabled');
  };
  addFormAttributeDisabled();
  window.helpers.addValue(inputAddress, ((window.data.SCREEN_WIDTH / 2) +
    ' , ' + (window.data.SCREEN_HEIGHT / 2)));

  var adTypeSelect = document.querySelector('#type');
  var housePrise = document.querySelector('#price');
  window.helpers.setAttribute(housePrise, 'min', Config.Type.Price.FLAT);

  var onSelectType = function () {
    var adType = document.querySelector('#type').value;
    switch (adType) {
      case 'bungalo':
        housePrise.placeholder = Config.Type.Price.BUNGALO;
        housePrise.min = Config.Type.Price.BUNGALO;
        break;
      case 'flat':
        housePrise.placeholder = Config.Type.Price.FLAT;
        housePrise.min = Config.Type.Price.FLAT;
        break;
      case 'house':
        housePrise.placeholder = Config.Type.Price.HOUSE;
        housePrise.min = Config.Type.Price.HOUSE;
        break;
      case 'palace':
        housePrise.placeholder = Config.Type.Price.PALACE;
        housePrise.min = Config.Type.Price.PALACE;
        break;
    }
    return adType;
  };

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

  //  Отправка формы
  var main = document.querySelector('main');
  var body = document.querySelector('body');

  var onSuccess = function () {
    addFormAttributeDisabled();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.card.remove();
    window.pin.mapMain.style.left = window.pin.PIN_COORD_LEFT_DEFAULT;
    window.pin.mapMain.style.top = window.pin.PIN_COORD_TOP_DEFAULT;
    hidePins();

    var successMessage = document.querySelector('#success').content.querySelector('div');
    body.insertBefore(successMessage, main);
    var onSuccessMessageClick = function () {
      document.removeEventListener('keydown', onSuccessKeyDown);
      successMessage.parentNode.removeChild(successMessage);
    };
    successMessage.addEventListener('click', onSuccessMessageClick);

    var onSuccessKeyDown = function (evt) {
      window.helpers.onKeyDown(evt, onSuccessMessageClick);
    };

    document.addEventListener('keydown', onSuccessKeyDown);
  };

  var onError = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('div');
    body.insertBefore(errorMessage, main);
    var onErrorMessageClick = function () {
      document.removeEventListener('keydown', onErrorKeyDown);
      body.removeChild(errorMessage);
    };
    errorMessage.addEventListener('click', onErrorMessageClick);
    var onErrorKeyDown = function (evt) {
      window.helpers.onKeyDown(evt, onErrorMessageClick);
    };
    document.addEventListener('keydown', onErrorKeyDown);

  };

  var submitForm = function () {
    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(adForm);
      window.backend.upLoad(formData, onSuccess, onError);
      adForm.reset();
      window.images.remove();
      window.images.change(AVATAR);
    });
  };
  var onClickReset = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.card.remove();
    window.pin.mapMain.style.left = window.pin.PIN_COORD_LEFT_DEFAULT;
    window.pin.mapMain.style.top = window.pin.PIN_COORD_TOP_DEFAULT;
    hidePins();
    addFormAttributeDisabled();
    adForm.reset();
    window.images.remove();
    window.images.change(AVATAR);
  };


  window.form = {
    ad: adForm,
    inputs: inputs,
    selects: selects,
    textarea: textarea,
    buttonSubmit: buttonFormSubmit,
    buttonReset: buttonFormReset,
    inputAddress: inputAddress,
    adTypeSelect: adTypeSelect,
    onSelectType: onSelectType,
    timeInSelect: timeInSelect,
    timeOutSelect: timeOutSelect,
    onSelectTimeIn: onSelectTimeIn,
    roomNumber: roomNumber,
    onSelectRoomNumber: onSelectRoomNumber,
    onClickReset: onClickReset,
    submit: submitForm,
    onSelectTimeOut: onSelectTimeOut,
  };
})();
