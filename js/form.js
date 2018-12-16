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
  var input = document.querySelectorAll('input');
  var select = document.querySelectorAll('select');
  var textarea = document.querySelectorAll('textarea');
  var buttonFormSubmit = document.querySelector('.ad-form__submit');
  var buttonFormReset = document.querySelector('.ad-form__reset');
  var inputAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');

  window.helpers.addAttribute(input, 'disabled');
  window.helpers.addAttribute(select, 'disabled');
  window.helpers.addAttribute(textarea, 'disabled');
  window.helpers.addAttribute(buttonFormSubmit, 'disabled');
  window.helpers.addAttribute(buttonFormReset, 'disabled');

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

  window.form = {
    adForm: adForm,
    input: input,
    select: select,
    textarea: textarea,
    buttonFormSubmi: buttonFormSubmit,
    buttonFormReset: buttonFormReset,
    inputAddress: inputAddress,
  };
})();
