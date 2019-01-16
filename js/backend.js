'use strict';
(function () {
  var SUCCESS = 200;
  var TIMEOUT = 10000;
  var GETURL = 'https://js.dump.academy/keksobooking/data';
  var POSTURL = 'https://js.dump.academy/keksobooking';

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS:
          onLoad(xhr.response);
          break;
        default:
          onError('Cтатус ответа' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT; // 10s
    xhr.open('GET', GETURL);
    xhr.send();
  };

  var upLoad = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS:
          onLoad(xhr.response);
          break;
        default:
          onError('Cтатус ответа' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.open('POST', POSTURL);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    upLoad: upLoad,
  };
})();
