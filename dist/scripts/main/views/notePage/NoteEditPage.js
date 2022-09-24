"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../common.js"));

var _date = require("../../../utils/date.js");

var _uniqueId = require("../../../utils/uniqueId.js");

var _BookModel = _interopRequireDefault(require("../../models/BookModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NoteEditPage = Object.create(_common["default"]);

NoteEditPage.setup = function (element) {
  this.init(element);
  return this;
};

NoteEditPage.render = function (id) {
  this.bookId = id;
  var html = this.getHtml();
  this.replaceChildren(html);
  this.bindElement();
  this.bindEvent();
};

NoteEditPage.getHtml = function () {
  return (
    /* html */
    "\n    <section class=\"editor\">\n      <header class=\"editor__header\">\n        <button class=\"editor__btn--esc\">\n          <i class=\"fa-solid fa-xmark\"></i>\n        </button>\n        <button class=\"editor__btn--save\">\uC800\uC7A5\uD558\uAE30</button>\n      </header>\n      <section class=\"editor__content\">\n        <section class=\"editor__note-information\">\n          <div>\n            <button class=\"editor__btn--label\">\n            <i class=\"fa-solid fa-book-bookmark\"></i>\n              \uCC45 \uC18D \uBB38\uC7A5\n            </button>\n            <button class=\"editor__btn--page\">\uD398\uC774\uC9C0</button>\n          </div>\n          <p class=\"editor__created-at\">".concat((0, _date.getCurrentTime)(), "</p>\n        </section>\n        <textarea class=\"editor__input\" placeholder=\"\uB178\uD2B8 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uBCF4\uC138\uC694.\"></textarea>\n      </section>\n    </section>\n  ")
  );
};

NoteEditPage.bindElement = function () {
  this.escBtn = this.element.querySelector('.editor__btn--esc');
  this.saveBtn = this.element.querySelector('.editor__btn--save');
  this.pageBtn = this.element.querySelector('.editor__btn--page');
  this.createdAt = this.element.querySelector('.editor__created-at');
  this.input = this.element.querySelector('.editor__input');
};

NoteEditPage.bindEvent = function () {
  var _this = this;

  this.escBtn.addEventListener('click', function () {
    _this.dispatch('@escClick');
  });
  this.saveBtn.addEventListener('click', function () {
    return _this.onSaveClick();
  });
};

NoteEditPage.onSaveClick = function () {
  if (this.input.value.length > 1) {
    var bookId = this.bookId;
    var newNote = this.createNewNote();
    this.dispatch('@saveClick', {
      bookId: bookId,
      newNote: newNote
    });
  }
};

NoteEditPage.createNewNote = function () {
  var book = _BookModel["default"].getBook(this.bookId);

  return {
    id: (0, _uniqueId.generateId)(),
    content: this.input.value,
    createdAt: this.createdAt.textContent,
    page: this.pageBtn.textContent === '페이지' ? 0 : Number(this.pageBtn.textContent),
    readCount: 0,
    isFavorite: false,
    authors: book.authors,
    title: book.title,
    thumbnail: book.thumbnail,
    bookId: book.id
  };
};

var _default = NoteEditPage;
exports["default"] = _default;