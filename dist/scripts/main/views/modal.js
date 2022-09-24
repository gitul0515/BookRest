"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("./common.js"));

var _className = require("../../utils/className.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Modal = Object.create(_common["default"]);

Modal.setup = function (element) {
  this.init(element);
  this.bindElement();
  this.bindEvent();
  return this;
};

Modal.bindElement = function () {
  this.content = this.element.querySelector('.modal__content');
};

Modal.bindEvent = function () {
  var _this = this;

  this.element.addEventListener('click', function (e) {
    return _this.onClick(e);
  });
};

Modal.onClick = function (_ref) {
  var target = _ref.target;

  if (target.matches('#modal')) {
    this.hide();
    return;
  }

  if (target.matches('.modal__tab-item')) {
    this.dispatch('@click', {
      target: target
    });
    this.hide();
  }
};

Modal.render = function (type, content) {
  var html;

  if (type.indexOf('list') >= 0) {
    html = this.getListHtml(content);
  }

  if (type === 'alert') {
    html = this.getAlertHtml(content);
  }

  this.content.innerHTML = html;
  this.setStyle(type);
  this.show();
};

Modal.getListHtml = function (content) {
  var id = content.id,
      title = content.title,
      key = content.key,
      items = content.items,
      bookId = content.bookId;
  return (
    /* html */
    "\n    <h2 class=\"modal__title\">".concat(title, "</h2>\n    <ul class=\"modal__tab-list\">\n      ").concat(items.map(function (_ref2) {
      var title = _ref2.title,
          value = _ref2.value,
          icon = _ref2.icon;
      return "\n        <li class=\"modal__tab-item\" data-id=".concat(id, " data-").concat(key, "=\"").concat(value, "\" data-title=\"").concat(title, "\" data-book-id=\"").concat(bookId, "\">\n          ").concat(icon ? "<i class=\"modal__icon ".concat(icon, "\"></i>") : "", "\n          ").concat(title, "\n        </li>\n      ");
    }).join(''), "\n    </ul>\n  ")
  );
};

Modal.getAlertHtml = function (content) {
  return "<p class=\"modal__message\">".concat(content.message, "</p>");
};

Modal.setStyle = function (type) {
  (0, _className.removeClass)(this.content, this.type);
  this.type = type;
  (0, _className.addClass)(this.content, this.type);
};

Modal.show = function () {
  (0, _className.addClass)(this.element, 'show');
  (0, _className.addClass)(this.content, 'show-up');
};

Modal.hide = function () {
  (0, _className.removeClass)(this.element, 'show');
  (0, _className.removeClass)(this.content, 'show-up');
};

var _default = Modal;
exports["default"] = _default;