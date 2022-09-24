"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSpace = exports.removeParenthesis = void 0;

var removeParenthesis = function removeParenthesis(text) {
  var index = text.indexOf('(');
  return index === -1 ? text : text.slice(0, index);
};

exports.removeParenthesis = removeParenthesis;

var removeSpace = function removeSpace(text) {
  return text.replaceAll(' ', '');
};

exports.removeSpace = removeSpace;