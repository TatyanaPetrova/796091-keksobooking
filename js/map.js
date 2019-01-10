'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var mapPins = document.querySelector('.map__pins');
  var onMapPinMainClick = function () {
    window.helpers.removeClass(window.card.map, 'map--faded');
    window.helpers.removeClass(window.form.adForm, 'ad-form--disabled');
    window.helpers.deleteAttributeForOneElement(window.filters.housingFeatures);
    window.helpers.deleteAttribute(window.form.inputs);
    window.helpers.deleteAttribute(window.form.selects);
    window.helpers.deleteAttributeForOneElement(window.form.textarea);

    window.helpers.deleteAttributeForOneElement(window.form.buttonFormSubmi);
    window.helpers.deleteAttributeForOneElement(window.form.buttonFormReset);
  };
  window.helpers.addValue(document.querySelector('#address'), ((window.data.SCREEN_WIDTH / 2) +
    ' ; ' + (window.data.SCREEN_HEIGHT / 2)));
  window.pin.mapPinMain.addEventListener('click', onMapPinMainClick);

  mapPins.onclick = function (evt) {
    var target = evt.target.closest('button');
    var buttonMain = document.querySelector('.map__pin--main');
    if (!target || target === buttonMain) {
      return;
    }
    window.card.сreateCards(target.value - 1);
    var mapCard = document.querySelector('.map__card');
    var popupClose = document.querySelector('.popup__close');
    var onButtonCloseClick = function () {
      if (mapCard) {
        mapCard.parentNode.removeChild(mapCard);
      }
    };
    popupClose.addEventListener('click', onButtonCloseClick);
    onkeydown = function (event) {
      if (event.keyCode === ESC_KEYCODE) {
        onButtonCloseClick();
      }
    };
  };
  document.addEventListener('keydown', onkeydown);
  window.map = {
    mapPins: mapPins,
    ESC_KEYCODE: ESC_KEYCODE,
  };
})();
