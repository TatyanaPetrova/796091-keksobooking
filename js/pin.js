'use strict';
(function () {
  var PIN_MAIN_LOCATION_X_MIN = 0;
  var PIN_MAIN_WIDTH = 66;
  var PIN_MAIN_HEIGHT = 66;
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var template = document.querySelector('#pin').content.querySelector('button');
  var сreatePins = function () {
    for (var i = 0; i < window.data.listData.length; i++) {
      var element = template.cloneNode(true);

      element.style.left = window.data.listData[i].location.x - window.data.PIN_WEIGHT / 2 + 'px';
      element.style.top = window.data.listData[i].location.y + window.data.PIN_HEIGHT + 'px';
      element.querySelector('img').src = window.data.listData[i].author.avatar;
      mapPins.appendChild(element);
    }
  };
  var movePin = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var finishCoordsX = (mapPinMain.offsetLeft - shift.x);
        var finishCoordsY = (mapPinMain.offsetTop - shift.y);

        var correctCoordX = finishCoordsX >= PIN_MAIN_LOCATION_X_MIN - PIN_MAIN_WIDTH / 2 && finishCoordsX <= window.data.SCREEN_WIDTH - PIN_MAIN_WIDTH / 2;

        var correctCoordY = finishCoordsY >= window.data.REFERENCE_POINT_HEIGHT - PIN_MAIN_HEIGHT && finishCoordsY <= window.data.SCREEN_HEIGHT - PIN_MAIN_HEIGHT;

        if (correctCoordX && correctCoordY) {
          mapPinMain.style.left = finishCoordsX + 'px';
          var inputAdressCoordX = finishCoordsX;
          mapPinMain.style.top = finishCoordsY + 'px';
          var inputAdressCoordY = finishCoordsY;
          window.form.inputAddress.value = ('"' + (inputAdressCoordX + PIN_MAIN_WIDTH / 2) + ' , ' + (inputAdressCoordY + PIN_MAIN_HEIGHT) + '"');
        }
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        сreatePins();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  movePin();
  window.pin = {
    mapPinMain: mapPinMain,
  };
})();
