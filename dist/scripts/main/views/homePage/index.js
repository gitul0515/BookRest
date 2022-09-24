"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../common.js"));

var _SearchList = _interopRequireDefault(require("./SearchList.js"));

var _format = require("/src/scripts/utils/format.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HomePage = Object.create(_common["default"]);

HomePage.setup = function (element) {
  this.init(element);
  this.initState();
  this.render();
  this.bindElement();
  this.setEvent();
  this.setupSubComponent();
};

HomePage.initState = function () {
  this.state = {
    searchResult: {
      searchWord: '',
      books: [],
      page: 1,
      isEndPage: false
    }
  };
};

HomePage.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;

    _SearchList["default"].setState(this.state.searchResult);
  }
};

HomePage.render = function () {
  this.element.innerHTML = this.getHtml();
};

HomePage.getHtml = function () {
  return (
    /* html */
    "\n    <header class=\"header\">\n      <h1 class=\"header__title\">\uBD81\uB808\uC2A4\uD2B8</h1>\n      <h3 class=\"header__message\">\uC624\uB298\uC740 \uC5B4\uB5A4 \uCC45\uC744 \uC77D\uC73C\uC168\uB098\uC694?</h3>\n    </header>\n    <div class=\"search-page__content\">\n      <form class=\"search-page__form\">\n        <i class=\"fa-solid fa-magnifying-glass\"></i>\n        <input\n        class=\"search-page__input\"\n        type=\"text\"\n        placeholder=\"\uC77D\uACE0 \uC788\uB294 \uCC45\uC744 \uCC3E\uC544\uBCF4\uC138\uC694\"\n        autofocus\n        >\n      </form>\n      <ul class=\"search-list\"></ul>\n    </div>\n  "
  );
};

HomePage.bindElement = function () {
  this.form = this.element.querySelector('.search-page__form');
  this.input = this.element.querySelector('.search-page__input');
  this.list = this.element.querySelector('.search-list');
};

HomePage.setEvent = function () {
  var _this = this;

  this.form.addEventListener('submit', function (e) {
    return _this.onSubmit(e);
  });
  this.list.addEventListener('click', function (e) {
    return _this.onClickBook(e);
  });
};

HomePage.setupSubComponent = function () {
  _SearchList["default"].setup(this.list, this.state, this.onNextPage);
};

HomePage.onSubmit = function (e) {
  e.preventDefault();
  var searchWord = this.input.value;

  if (searchWord) {
    this.initState();
    this.dispatch('@search-book-api', {
      searchWord: searchWord,
      page: 1
    });
    this.form.reset();
  }
};

HomePage.onNextPage = function (_ref) {
  var searchWord = _ref.searchWord,
      page = _ref.page;
  HomePage.dispatch('@search-book-api', {
    searchWord: searchWord,
    page: page
  });
};

HomePage.onClickBook = function (e) {
  var li = e.target.closest('.search-item');

  if (li) {
    var id = li.dataset.id;
    var clickedBook = this.state.searchResult.books.find(function (_ref2) {
      var isbn = _ref2.isbn;
      return (0, _format.removeSpace)(isbn) === id;
    });
    this.dispatch('@clickBook', {
      clickedBook: clickedBook
    });
  }
};

var _default = HomePage;
exports["default"] = _default;