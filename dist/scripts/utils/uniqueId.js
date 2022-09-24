"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateId = void 0;

var generateId = function generateId() {
  return String(Math.floor(new Date().valueOf() * Math.random()));
};

exports.generateId = generateId;