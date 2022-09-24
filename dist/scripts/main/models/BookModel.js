"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BOOK_MODEL_DATA_KEY = void 0;

var _storage = require("../../utils/storage.js");

var _dummy = require("../../../data/dummy.js");

var _format = require("/src/scripts/utils/format.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BOOK_MODEL_DATA_KEY = 'bookModelDataKey';
exports.BOOK_MODEL_DATA_KEY = BOOK_MODEL_DATA_KEY;
var _default = {
  books: (0, _storage.getItem)(BOOK_MODEL_DATA_KEY, _dummy.initialData),
  getAllBooks: function getAllBooks() {
    return _toConsumableArray(this.books);
  },
  getBook: function getBook(id) {
    return this.books.find(function (book) {
      return book.id === id;
    });
  },
  setBooks: function setBooks(nextBooks) {
    if (this.books !== nextBooks) {
      this.books = nextBooks;
    }
  },
  searchBooks: function searchBooks(query) {
    return this.books.filter(function (book) {
      return book.title.includes(query);
    });
  },
  sortBooks: function sortBooks(by) {
    var books = _toConsumableArray(this.books);

    switch (by) {
      case 'title':
        return books.sort(function (a, b) {
          return a['title'].localeCompare(b['title']);
        });

      case 'title-reverse':
        return books.sort(function (a, b) {
          return b['title'].localeCompare(a['title']);
        });

      case 'high-rating':
        return books.sort(function (a, b) {
          return b['rating'].localeCompare(a['rating']);
        });

      case 'low-rating':
        return books.sort(function (a, b) {
          return a['rating'].localeCompare(b['rating']);
        });

      default:
        break;
    }
  },
  addBook: function addBook(newBook) {
    var _this = this;

    var id = (0, _format.removeSpace)(newBook.isbn);
    return new Promise(function (result, reject) {
      setTimeout(function () {
        if (_this.isDuplicate(id)) {
          reject(new Error('DUPLICATE_ID'));
          return;
        }

        _this.setBooks([].concat(_toConsumableArray(_this.books), [_objectSpread(_objectSpread({}, newBook), {}, {
          id: id,
          rating: '7',
          notes: []
        })]));

        (0, _storage.setItem)(BOOK_MODEL_DATA_KEY, _this.books);
        result(_this.books);
      });
    });
  },
  isDuplicate: function isDuplicate(id) {
    return this.books.some(function (book) {
      return book.id === id;
    });
  },
  deleteBook: function deleteBook(id) {
    var newBooks = this.books.filter(function (book) {
      return book.id !== id;
    });
    this.setBooks(newBooks);
    (0, _storage.setItem)(BOOK_MODEL_DATA_KEY, this.books);
  },
  getNoteList: function getNoteList() {
    return this.books.reduce(function (acc, book) {
      var notes = book.notes,
          title = book.title,
          authors = book.authors,
          thumbnail = book.thumbnail,
          id = book.id;

      if (notes.length) {
        notes.forEach(function (note) {
          acc.push(_objectSpread(_objectSpread({}, note), {}, {
            title: title,
            authors: authors,
            thumbnail: thumbnail,
            bookId: id
          }));
        });
      }

      return acc;
    }, []);
  },
  getNote: function getNote(id) {
    var result;
    this.books.forEach(function (_ref) {
      var notes = _ref.notes;

      if (notes.length) {
        notes.forEach(function (note) {
          if (note.id === id) {
            result = note;
          }
        });
      }
    });
    return result;
  },
  addNote: function addNote(id, newNote) {
    var book = this.getBook(id);
    book.notes.push(newNote);
    (0, _storage.setItem)(BOOK_MODEL_DATA_KEY, this.books);
  },
  deleteNote: function deleteNote(id, bookId) {
    var book = this.getBook(bookId);
    book.notes = book.notes.filter(function (note) {
      return note.id !== id;
    });
    (0, _storage.setItem)(BOOK_MODEL_DATA_KEY, this.books);
  },
  getNumberOfBooks: function getNumberOfBooks() {
    return this.books.length;
  },
  getNumberOfNotes: function getNumberOfNotes() {
    var result = 0;
    this.books.forEach(function (_ref2) {
      var notes = _ref2.notes;
      result += notes.length;
    });
    return result;
  }
};
exports["default"] = _default;