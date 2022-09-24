"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setItem = exports.removeItem = exports.getItem = void 0;
var storage = window.localStorage;

var setItem = function setItem(key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage 저장 오류입니다.');
  }
};

exports.setItem = setItem;

var getItem = function getItem(key, defaultValue) {
  try {
    var storedValue = storage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

exports.getItem = getItem;

var removeItem = function removeItem(key) {
  storage.removeItem(key);
};

exports.removeItem = removeItem;