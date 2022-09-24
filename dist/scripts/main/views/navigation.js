"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("./common.js"));

var _className = require("../../utils/className.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var MAIN_PATHS = ['/', '/book', '/note'];
var Navigation = Object.create(_common["default"]);

Navigation.setup = function (element) {
  this.init(element);
  this.render();
  this.setEvent();
  this.initState();
  return this;
};

Navigation.render = function () {
  var html = this.getHtml();
  this.replaceChildren(html);
};

Navigation.getHtml = function () {
  return (
    /* html */
    "\n    <a class=\"navigation__tab-link active\" href=\"/\">\n      <i class=\"navigation__tab-icon fa-solid fa-house\"></i>\n    </a>\n    <a class=\"navigation__tab-link\" href=\"/book\">\n      <i class=\"navigation__tab-icon fa-solid fa-book-open-reader\"></i>\n    </a>\n    <a class=\"navigation__tab-link\" href=\"/note\">\n      <i class=\"navigation__tab-icon fa-solid fa-pen-to-square\"></i>\n    </a>\n  "
  );
};

Navigation.setEvent = function () {
  var _this = this;

  this.element.addEventListener('click', function (e) {
    return _this.onClick(e);
  });
};

Navigation.onClick = function (e) {
  if (e.target.matches('.navigation__tab-link')) {
    e.preventDefault();
    var path = e.target.getAttribute('href');
    this.dispatch('@click', {
      path: path
    }); // MainController에서 처리
  }
};

Navigation.initState = function () {
  this.state = {
    tabs: _toConsumableArray(this.element.children),
    previousTab: this.element.firstElementChild,
    currentTab: this.element.firstElementChild
  };
};

Navigation.setState = function (path) {
  if (!MAIN_PATHS.includes(path)) {
    Navigation.hide();
    return;
  }

  Navigation.show();
  var index = MAIN_PATHS.indexOf(path);
  this.state.currentTab = this.state.tabs[index];
  this.setTabStyle();
  this.state.previousTab = this.state.currentTab;
};

Navigation.setTabStyle = function () {
  (0, _className.removeClass)(this.state.previousTab, 'active');
  (0, _className.addClass)(this.state.currentTab, 'active');
};

Navigation.show = function () {
  this.element.classList.remove('hide');
};

Navigation.hide = function () {
  this.element.classList.add('hide');
};

var _default = Navigation;
exports["default"] = _default;