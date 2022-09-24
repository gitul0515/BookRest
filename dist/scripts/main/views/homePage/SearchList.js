"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../common.js"));

var _format = require("/src/scripts/utils/format.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SearchList = Object.create(_common["default"]);

SearchList.setup = function (element, initialState, onNextPage) {
  this.init(element);
  this.state = initialState;
  this.onNextPage = onNextPage;
};

SearchList.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;
    this.render();
  }
};

SearchList.render = function () {
  if (!this.state.books.length) {
    this.element.innerHTML = this.getNoResultHtml();
    return;
  }

  this.element.innerHTML = this.getListHtml(this.state.books); // Todo: 렌더링 최적화 필요

  this.setObserverTarget();
};

SearchList.getNoResultHtml = function () {
  return "<p>\n    \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.<br>\n    \uB2E4\uC2DC \uAC80\uC0C9\uD574 \uBCF4\uC2DC\uACA0\uC5B4\uC694?\n  </p>";
};

SearchList.getListHtml = function (books) {
  return books.map(function (_ref) {
    var title = _ref.title,
        authors = _ref.authors,
        publisher = _ref.publisher,
        thumbnail = _ref.thumbnail,
        isbn = _ref.isbn;
    return (
      /* html */
      "\n      <li class=\"search-item\" data-id=".concat((0, _format.removeSpace)(isbn), ">\n        <div class=\"search-item__thumbnail\" >\n          <img \n            src=").concat(thumbnail, " \n            alt=\"\uCC45 \uD45C\uC9C0 \uC774\uBBF8\uC9C0\" \n            onerror=\"this.src='/src/asset/image/book/book-no.jpg'\"\n          >\n        </div>\n        <div class=\"search-item__description\">\n          <h2 class=\"search-item__title\">\n            ").concat((0, _format.removeParenthesis)(title), "\n          </h2>\n          <div>\n            <span class=\"search-item__authors\">").concat(authors[0], "</span>\n            <span class=\"search-item__publisher\">").concat(publisher, "</span>\n          </div>\n        </div>\n      </li>\n    ")
    );
  }).join('');
};

SearchList.observer = new IntersectionObserver(function (_ref2) {
  var _ref3 = _slicedToArray(_ref2, 1),
      entry = _ref3[0];

  if (entry.isIntersecting) {
    SearchList.onIntersect();
  }
}, {
  threshold: 0.5
});

SearchList.onIntersect = function () {
  if (!this.state.isEndPage) {
    this.onNextPage({
      searchWord: this.state.searchWord,
      page: this.state.page + 1
    });
  }
};

SearchList.setObserverTarget = function () {
  var nextTarget = this.element.querySelector('.search-item:last-child');

  if (nextTarget) {
    this.currentTarget && this.observer.unobserve(this.currentTarget);
    this.currentTarget = nextTarget;
    this.observer.observe(this.currentTarget);
  }
};

var _default = SearchList;
exports["default"] = _default;