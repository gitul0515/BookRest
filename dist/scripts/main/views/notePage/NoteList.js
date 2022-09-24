"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../common.js"));

var _modal = _interopRequireDefault(require("../modal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NoteList = Object.create(_common["default"]);

NoteList.setup = function (element) {
  this.init(element);
  this.bindEvent();
  return this;
};

NoteList.bindEvent = function () {
  var _this = this;

  this.element.addEventListener('click', function (e) {
    return _this.onClick(e);
  });
};

NoteList.render = function (notes) {
  if (!Array.isArray(notes)) {
    return;
  }

  this.notes = notes;
  var html;

  if (notes.length) {
    html = this.getHtml(notes);
  } else {
    html = this.getNotFoundHtml();
  }

  this.replaceChildren(html);
};

NoteList.getHtml = function (notes) {
  var _this2 = this;

  return notes.map(function (_ref) {
    var id = _ref.id,
        title = _ref.title,
        authors = _ref.authors,
        thumbnail = _ref.thumbnail,
        createdAt = _ref.createdAt,
        content = _ref.content,
        page = _ref.page,
        bookId = _ref.bookId;
    return (
      /* html */
      "\n      <li class=\"note-item\" data-id=".concat(id, " data-book-id=").concat(bookId, ">\n        <header class=\"note-item__header\">\n          <h3 class=\"note-item__label\">\n            <i class=\"fa-solid fa-thumbtack\"></i>\n            \uCC45 \uC18D \uBB38\uC7A5\n          </h3>\n          <div class=\"note-item__information\">\n            <div class=\"note-item__book-informaion\">\n              <div>\n                <h3 class=\"note-item__book-title\">").concat(_this2.getWithoutParenthesis(title), "</h3>\n                <span class=\"note-item__book-author\">").concat(authors, "</span>\n              </div>\n              <img class=\"note-item__book-thumbnail\" src=\"").concat(thumbnail, "\"/>\n            </div>\n            <p class=\"note-item__created-at\">").concat(createdAt, "</p>\n          </div>\n        </header>\n        <section class=\"note-item__content\">\n          <p class=\"note-item__text\">").concat(content, "</p>\n          <div>\n            <span class=\"note-item__page\">").concat(page > 0 ? "p. ".concat(page) : ' ', "</span>\n          </div>\n        </section>\n        <footer class=\"note-item__footer\">\n          <button class=\"note-item__btn note-item__btn--options\">\n            <i class=\"fa-solid fa-ellipsis-vertical\"></i>\n          </button>\n        </footer>\n      </li>\n    ")
    );
  }).join('');
};

NoteList.getWithoutParenthesis = function (title) {
  var index = title.indexOf('(');
  return index === -1 ? title : title.slice(0, index);
};

NoteList.onClick = function (_ref2) {
  var target = _ref2.target;
  var noteItem = target.closest('.note-item');

  if (noteItem) {
    var _noteItem$dataset = noteItem.dataset,
        id = _noteItem$dataset.id,
        bookId = _noteItem$dataset.bookId;

    if (target.matches('.note-item__btn--options')) {
      var modalContent = {
        id: id,
        bookId: bookId,
        title: '작업을 선택해주세요.',
        key: 'note-option',
        items: [{
          title: '노트 삭제',
          value: 'remove',
          icon: 'fa-solid fa-trash'
        }]
      };

      _modal["default"].render('list-1', modalContent);

      return;
    }
  }
};

NoteList.getNotFoundHtml = function () {
  return "";
};

var _default = NoteList;
exports["default"] = _default;