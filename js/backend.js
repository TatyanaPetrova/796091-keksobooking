'use strict';
(function () {
  var getURL = 'https://js.dump.academy/keksobooking/data';
  var postURL = 'https://js.dump.academy/keksobooking';


  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', getURL);
    xhr.send();
    xhr.timeout = 10000; // 10s

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
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
  };

  var postData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postURL);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    postData: postData,
  };
})();