"use strict";

var _MainController = _interopRequireDefault(require("./main/controllers/MainController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _MainController["default"].init();
});