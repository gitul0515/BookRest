"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _modal = _interopRequireDefault(require("../views/modal.js"));

var _BookController = _interopRequireDefault(require("./BookController.js"));

var _NoteController = _interopRequireDefault(require("./NoteController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var modal = document.getElementById('modal');
var _default = {
  init: function init() {
    var _this = this;

    _modal["default"].setup(modal).on('@click', function (e) {
      return _this.onClick(e.detail.target);
    }).on('@submit', function (e) {
      return _this.onSubmit(e.detail.value, e.detail.dataset);
    });
  },
  onClick: function onClick(_ref) {
    var dataset = _ref.dataset;

    if ('sortBookBy' in dataset) {
      var sortBookBy = dataset.sortBookBy,
          title = dataset.title;

      _BookController["default"].sortBooks(sortBookBy, title);

      _modal["default"].hide();

      return;
    }

    if ('bookOption' in dataset) {
      var id = dataset.id,
          bookOption = dataset.bookOption;

      switch (bookOption) {
        case 'remove':
          _BookController["default"].deleteBook(id);

          break;

        default:
          throw new Error('Invalid bookOption.');
      }

      return;
    }

    if ('noteOption' in dataset) {
      var _id = dataset.id,
          bookId = dataset.bookId,
          noteOption = dataset.noteOption;

      switch (noteOption) {
        case 'remove':
          _NoteController["default"].deleteNote(_id, bookId);

          break;

        default:
          throw new Error('Invalid noteOption.');
      }

      return;
    }
  }
};
exports["default"] = _default;