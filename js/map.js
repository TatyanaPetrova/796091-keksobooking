'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var onMapPinMainClick = function () {
    window.helpers.removeClass(window.card.map, 'map--faded');
    window.helpers.removeClass(window.form.ad, 'ad-form--disabled');
    window.helpers.deleteAttributeForOneElement(window.filters.housingFeatures);
    window.helpers.deleteAttribute(window.form.inputs);
    window.helpers.deleteAttribute(window.form.selects);
    window.helpers.deleteAttributeForOneElement(window.form.textarea);

    window.helpers.deleteAttributeForOneElement(window.form.buttonSubmit);
    window.helpers.deleteAttributeForOneElement(window.form.buttonReset);
    window.form.adTypeSelect.addEventListener('change', window.form.onSelectType);

    window.form.timeInSelect.addEventListener('change', window.form.onSelectTimeOut);

    window.form.roomNumber.addEventListener('change', window.form.onSelectRoomNumber);

    window.form.timeOutSelect.addEventListener('change', window.form.onSelectTimeIn);

    document.querySelector('.ad-form__reset').addEventListener('click', window.form.onClickReset);

    window.form.submit();
    window.filters.addHandler();
    window.images.load();
  };
  window.helpers.addValue(document.querySelector('#address'), ((window.data.SCREEN_WIDTH / 2) +
    ' ; ' + (window.data.SCREEN_HEIGHT / 2)));
  window.pin.mapMain.addEventListener('click', onMapPinMainClick);

  mapPins.onclick = function (evt) {
    var target = evt.target.closest('button');
    var buttonMain = document.querySelector('.map__pin--main');
    if (!target || target === buttonMain) {
      return;
    }
    window.card.сreate(target.value - 1);
    var mapCard = document.querySelector('.map__card');
    var popupClose = document.querySelector('.popup__close');
    var onButtonCloseClick = function () {
      document.removeEventListener('keydown', onButtonCloseDown);
      window.card.remove(mapCard);
    };
    popupClose.addEventListener('click', onButtonCloseClick);
    var onButtonCloseDown = function (event) {
      window.helpers.onKeyDown(event, onButtonCloseClick);
    };
    document.addEventListener('keydown', onButtonCloseDown);
  };
  window.map = {
    pins: mapPins,
  };
})();
