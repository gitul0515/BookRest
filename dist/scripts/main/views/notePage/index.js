"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../common.js"));

var _BookModel = _interopRequireDefault(require("../../models/BookModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotePage = Object.create(_common["default"]);

NotePage.setup = function (element) {
  this.init(element);
  this.render();
};

NotePage.render = function () {
  var html = this.getHtml();
  this.replaceChildren(html);
};

NotePage.getHtml = function () {
  return (
    /* html */
    "\n    <header class=\"header\">\n      <h1 class=\"header__title\">\uB098\uC758 \uB178\uD2B8</h1>\n      <h3 class=\"header__message\">".concat(_BookModel["default"].getNumberOfNotes(), "\uAC1C\uC758 \uB178\uD2B8\uB97C \uC791\uC131\uD558\uC168\uAD70\uC694!</h3>\n    </header>\n    <div class=\"content content--note\">\n      <ul class=\"note-list\"></ul>\n    </div>\n  ")
  );
};

var _default = NotePage;
exports["default"] = _default;