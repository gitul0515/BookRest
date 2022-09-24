"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../common.js"));

var _modal = _interopRequireDefault(require("../modal.js"));

var _NoteList = _interopRequireDefault(require("../notePage/NoteList.js"));

var _format = require("/src/scripts/utils/format.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BookDetailPage = Object.create(_common["default"]);

BookDetailPage.setup = function (element) {
  this.init(element);
  return this;
};

BookDetailPage.render = function (data) {
  this.element.innerHTML = this.getHtml(data);
  this.bindElement();
  this.setEvent();

  _NoteList["default"].setup(this.ul);

  _NoteList["default"].render(data.notes);
};

BookDetailPage.getHtml = function (data) {
  if (!data) {
    throw new Error('책 data가 존재하지 않습니다.');
  }

  this.data = data;
  var _this$data = this.data,
      title = _this$data.title,
      authors = _this$data.authors,
      publisher = _this$data.publisher,
      thumbnail = _this$data.thumbnail,
      notes = _this$data.notes;
  return (
    /* html */
    "\n    <header class=\"detail-page__header\">\n      <div class=\"detail-page__btns\"> \n        <button class=\"detail-page__btn detail-page__btn--prev\">\n          <i class=\"fa-solid fa-arrow-left\"></i>\n        </button>\n        <button class=\"detail-page__btn detail-page__btn--menu\">\n          <i class=\"fa-solid fa-ellipsis-vertical\"></i>\n        </button>\n      </div>\n      <h1 class=\"detail-page__title\">".concat((0, _format.removeParenthesis)(title), "</h1>\n      <div class=\"detail-page__information\">\n        <div class=\"detail-page__thumbnail\">\n          <img src=\"").concat(thumbnail, "\" alt=\"\uC378\uB124\uC77C \uC774\uBBF8\uC9C0\"/>\n        </div>\n        <div class=\"detail-page__description\">\n          <span class=\"detail-page__authors\">").concat(authors[0], "</span>\n          <span class=\"detail-page__publisher\">").concat(publisher, "</span>\n        </div>\n      </div>\n      <button class=\"detail-page__btn--add\">\n        <i class=\"fa-solid fa-file-circle-plus\"></i>\n      </button>\n    </header>\n    <section class=\"detail-page__content\">\n      <ul class=\"note-list\"></ul>\n      ").concat(!notes.length ? "<p class=\"detail-page__not-found-message\">\uC800\uC7A5\uD55C \uB178\uD2B8\uAC00 \uC5C6\uC5B4\uC694...\n          <br>\uC9C0\uAE08 \uCCAB \uB178\uD2B8\uB97C \uC791\uC131\uD574 \uBCF4\uC138\uC694 :)\n          </p>" : '', "\n    </section>\n  ")
  );
};

BookDetailPage.getNoteListHtml = function (notes) {
  var result = '';
  result += notes.map(function (note) {
    var id = note.id,
        createdAt = note.createdAt,
        content = note.content,
        page = note.page,
        readCount = note.readCount;
    return (
      /* html */
      "\n      <li class=\"note-item\" data-id=".concat(id, ">\n        <header class=\"note-item__header\">\n          <h3 class=\"note-item__label\">\n            <i class=\"fa-solid fa-thumbtack\"></i>\n            \uCC45 \uC18D \uBB38\uC7A5\n          </h3>\n          <p class=\"note-item__created-at\">").concat(createdAt, "</p>\n        </header>\n        <section class=\"note-item__content\">\n          <p class=\"note-item__text\">").concat(content, "</p>\n          <div>\n            <span class=\"note-item__page\">").concat(page > 0 ? "p. ".concat(page) : '', "</span>\n          </div>\n        </section>\n        <footer class=\"note-item__footer\">\n          <button class=\"note-item__btn note-item__btn--options\">\n            <i class=\"fa-solid fa-ellipsis-vertical\"></i>\n          </button>\n        </footer>\n      </li>\n  ")
    );
  }).join('');
  return result;
};

BookDetailPage.bindElement = function () {
  this.prevBtn = this.element.querySelector('.detail-page__btn--prev');
  this.addBtn = this.element.querySelector('.detail-page__btn--add');
  this.menuBtn = this.element.querySelector('.detail-page__btn--menu');
  this.ul = this.element.querySelector('.note-list');
};

BookDetailPage.setEvent = function () {
  var _this = this;

  this.prevBtn.addEventListener('click', function () {
    _this.dispatch('@prevClick');
  });
  this.addBtn.addEventListener('click', function () {
    var id = _this.data.id;

    _this.dispatch('@addClick', {
      id: id
    });
  });
  this.menuBtn.addEventListener('click', function () {
    var id = _this.data.id;
    var modalContent = {
      id: id,
      title: '작업을 선택해주세요.',
      key: 'book-option',
      items: [{
        title: '책 삭제',
        value: 'remove',
        icon: 'fa-solid fa-trash'
      }]
    };

    _modal["default"].render('list-1', modalContent);

    return;
  });
};

var _default = BookDetailPage;
exports["default"] = _default;