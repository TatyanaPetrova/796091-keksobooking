'use strict';

(function () {
  var removeClass = function (selector, classDelete) {
    selector.classList.remove(classDelete);
  };
  var addAttribute = function (selector, attribute) {
    for (var i = 0; i < selector.length; i++) {
      selector[i].setAttribute(attribute, attribute);
    }
  };

  var addAttributeForOneElement = function (selector, attribute) {
    selector.setAttribute(attribute, attribute);
  };

  var deleteAttribute = function (selector) {
    for (var i = 0; i < selector.length; i++) {
      selector[i].disabled = false;
    }
  };

  var deleteAttributeForOneElement = function (selector) {
    selector.disabled = false;
  };

  var addValue = function (selector, content) {
    selector.setAttribute('value', content);
  };
  var hideElement = function (selector, classAdd) {
    for (var i = 0; i < selector.length; i++) {
      selector[i].classList.add(classAdd);
    }
  };
  var removeManyClass = function (selector, classDelete) {
    for (var i = 0; i < selector.length; i++) {
      selector[i].classList.remove(classDelete);
    }
  };

  window.helpers = {
    removeClass: removeClass,
    addAttribute: addAttribute,
    deleteAttribute: deleteAttribute,
    addValue: addValue,
    hideElement: hideElement,
    removeManyClass: removeManyClass,
    addAttributeForOneElement: addAttributeForOneElement,
    deleteAttributeForOneElement: deleteAttributeForOneElement,
  };
})();
