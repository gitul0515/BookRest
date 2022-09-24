"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../views/homePage/index.js"));

var _HomeController = _interopRequireDefault(require("./HomeController.js"));

var _index2 = _interopRequireDefault(require("../views/bookPage/index.js"));

var _BookDetailPage = _interopRequireDefault(require("../views/bookPage/BookDetailPage.js"));

var _BookController = _interopRequireDefault(require("./BookController.js"));

var _index3 = _interopRequireDefault(require("../views/notePage/index.js"));

var _NoteEditPage = _interopRequireDefault(require("../views/notePage/NoteEditPage.js"));

var _NoteController = _interopRequireDefault(require("./NoteController.js"));

var _navigation = _interopRequireDefault(require("../views/navigation.js"));

var _ModalController = _interopRequireDefault(require("./ModalController.js"));

var _BookModel = _interopRequireDefault(require("../models/BookModel.js"));

var _regexp = require("../../constants/regexp.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var page = document.getElementById('page');
var navigation = document.getElementById('navigation');
var _default = {
  init: function init() {
    var _this = this;

    _ModalController["default"].init();

    _navigation["default"].setup(navigation).on('@click', function (e) {
      return _this.onClick(e.detail.path);
    });

    window.addEventListener('popstate', function () {
      return _this.route();
    });
    this.route();
  },
  route: function route() {
    var path = window.location.pathname;

    if (path === '/') {
      _index["default"].setup(page);

      _HomeController["default"].init();
    }

    if (path === '/book') {
      _index2["default"].setup(page);

      _BookController["default"].init();
    }

    if (path === '/note') {
      _index3["default"].setup(page);

      _NoteController["default"].init();
    }

    if (_regexp.REGEXP.BOOK_DETAIL_PAGE.test(path)) {
      var id = path.split('/')[2];

      var book = _BookModel["default"].getBook(id);

      _BookDetailPage["default"].render(book);
    }

    if (_regexp.REGEXP.BOOK_EDIT_PAGE.test(path)) {
      var _id = path.split('/')[2];

      _NoteEditPage["default"].render(_id);
    }

    _navigation["default"].setState(path);
  },
  onClick: function onClick(path) {
    history.pushState(null, null, path);
    this.route();
  }
};
exports["default"] = _default;