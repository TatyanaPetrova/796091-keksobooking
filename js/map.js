'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var onMapPinMainClick = function () {
    window.helpers.removeClass(window.card.map, 'map--faded');
    window.helpers.removeClass(window.form.adForm, 'ad-form--disabled');

    window.helpers.deleteAttribute(window.form.input);
    window.helpers.deleteAttribute(window.form.select);
    window.helpers.deleteAttribute(window.form.textarea);
    window.helpers.deleteAttribute(window.form.buttonFormSubmi);
    window.helpers.deleteAttribute(window.form.buttonFormReset);
  };
  window.helpers.addValue(document.querySelector('#address'), ((window.data.SCREEN_WIDTH / 2) +
    ' ; ' + (window.data.SCREEN_HEIGHT / 2)));
  window.pin.mapPinMain.addEventListener('click', onMapPinMainClick);

  mapPins.onclick = function (evt) {
    var target = evt.target.closest('button');
    if (!target || target.classList.contains('.map__pin--main')) {
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
  };

  window.map = {
    mapPins: mapPins,
  };
})();
