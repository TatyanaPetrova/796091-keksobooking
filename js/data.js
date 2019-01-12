'use strict';
(function () {
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var SCREEN_WIDTH = 1200;
  var SCREEN_HEIGHT = 630;
  var REFERENCE_POINT_HEIGHT = 130;
  var PIN_HEIGHT = 70;
  var PIN_WEIGHT = 50;
  var copyCheckout = CHECKOUT.slice();
  var copyCheckin = CHECKIN.slice();

  window.data = {
    SCREEN_WIDTH: SCREEN_WIDTH,
    SCREEN_HEIGHT: SCREEN_HEIGHT,
    copyCheckout: copyCheckout,
    copyCheckin: copyCheckin,
    PIN_WEIGHT: PIN_WEIGHT,
    PIN_HEIGHT: PIN_HEIGHT,
    REFERENCE_POINT_HEIGHT: REFERENCE_POINT_HEIGHT,
  };
})();
