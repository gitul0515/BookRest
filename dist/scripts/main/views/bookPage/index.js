"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../common.js"));

var _modal = _interopRequireDefault(require("../modal.js"));

var _BookList = _interopRequireDefault(require("./BookList.js"));

var _BookModel = _interopRequireDefault(require("../../models/BookModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BookPage = Object.create(_common["default"]);

BookPage.setup = function (element) {
  this.init(element);
  this.render();
  this.bindElement();
  this.setEvent();

  _BookList["default"].setup(this.list);
};

BookPage.render = function () {
  var html = this.getHtml();
  this.replaceChildren(html);
};

BookPage.getHtml = function () {
  return (
    /* html */
    "\n    <header class=\"header\">\n      <h1 class=\"header__title\">\uB098\uC758 \uC11C\uC7AC</h1>\n      <h3 class=\"header__message\">".concat(_BookModel["default"].getNumberOfBooks(), "\uAD8C\uC758 \uCC45\uC744 \uB2E4 \uC77D\uC73C\uC168\uC5B4\uC694!</h3>\n    </header>\n    <div class=\"content content--book\">\n      <form class=\"search-form\" action=\"\" method=\"get\">\n        <i class=\"fa-solid fa-magnifying-glass\"></i>\n        <input \n          class=\"search-form__input\"\n          type=\"text\" \n          placeholder=\"\uB4F1\uB85D\uD55C \uCC45\uC744 \uAC80\uC0C9\uD574\uBCF4\uC138\uC694\"\n          pattern=\".{2,}\" \n          title=\"\uB450 \uAE00\uC790 \uC774\uC0C1 \uC785\uB825\uD558\uC138\uC694\"\n        >\n      </form>\n      <button class=\"button--sort\">\uC81C\uBAA9 \uC21C\uC11C\uB85C</button>\n      <ul class=\"book-list\"></ul>\n    </div>\n  ")
  );
};

BookPage.bindElement = function () {
  this.form = this.element.querySelector('.search-form');
  this.input = this.element.querySelector('.search-form__input');
  this.sortButton = this.element.querySelector('.button--sort');
  this.list = this.element.querySelector('.book-list');
};

BookPage.setEvent = function () {
  var _this = this;

  this.form.addEventListener('submit', function (e) {
    return _this.onSearch(e);
  });
  this.sortButton.addEventListener('click', function () {
    return _this.onClickButton();
  });
  this.list.addEventListener('click', function (e) {
    return _this.onClickList(e);
  });
};

BookPage.onSearch = function (e) {
  e.preventDefault();
  var value = this.input.value;
  this.dispatch('@search', {
    value: value
  });
  this.input.value = '';
};

BookPage.onClickButton = function () {
  var modalContent = {
    title: '정렬 방법을 선택해주세요.',
    key: 'sort-book-by',
    items: [{
      title: '제목 순서로',
      value: 'title'
    }, {
      title: '제목 역순으로',
      value: 'title-reverse'
    }, {
      title: '높은 별점부터',
      value: 'high-rating'
    }, {
      title: '낮은 별점부터',
      value: 'low-rating'
    }]
  };

  _modal["default"].render('list-4', modalContent);
};

BookPage.onClickList = function (e) {
  var li = e.target.closest('li');

  if (li) {
    var id = li.dataset.id;
    this.dispatch('@detailPage', {
      id: id
    });
  }
};

BookPage.setSortButtonText = function (sortBy) {
  this.sortButton.textContent = sortBy;
};

var _default = BookPage;
exports["default"] = _default;