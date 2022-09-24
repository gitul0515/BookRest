"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentTime = void 0;

var getCurrentTime = function getCurrentTime() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  var hour = today.getHours();
  var minute = today.getMinutes();
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  return "".concat(year, "\uB144 ").concat(month, "\uC6D4 ").concat(date, "\uC77C ").concat(hour, ":").concat(minute);
};

exports.getCurrentTime = getCurrentTime;