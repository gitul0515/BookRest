"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleClass = exports.removeClass = exports.addClass = void 0;

var addClass = function addClass(element) {
  for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classNames[_key - 1] = arguments[_key];
  }

  classNames.forEach(function (className) {
    element.classList.add(className);
  });
};

exports.addClass = addClass;

var removeClass = function removeClass(element) {
  for (var _len2 = arguments.length, classNames = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    classNames[_key2 - 1] = arguments[_key2];
  }

  classNames.forEach(function (className) {
    element.classList.remove(className);
  });
};

exports.removeClass = removeClass;

var toggleClass = function toggleClass(element) {
  for (var _len3 = arguments.length, classNames = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    classNames[_key3 - 1] = arguments[_key3];
  }

  classNames.forEach(function (className) {
    element.classList.toggle(className);
  });
};

exports.toggleClass = toggleClass;