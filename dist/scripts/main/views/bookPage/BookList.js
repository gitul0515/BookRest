"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../common.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BookList = Object.create(_common["default"]);

BookList.setup = function (element) {
  this.init(element);
  return this;
};

BookList.render = function (data) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  var html = this.getHtml(data);
  this.replaceChildren(html);
};

BookList.getHtml = function (data) {
  var _this = this;

  return data.map(function (_ref) {
    var title = _ref.title,
        rating = _ref.rating,
        thumbnail = _ref.thumbnail,
        id = _ref.id;
    return (
      /* html */
      " \n    <li class=\"book-item\" data-id=".concat(id, ">\n      <div class=\"book-item__img\" >\n        <img src=\"").concat(thumbnail, "\" alt=\"\uCC45 \uD45C\uC9C0 \uC774\uBBF8\uC9C0\" onerror=\"this.src='/src/asset/image/book/book-no.jpg'\">\n      </div>\n      <ul class=\"book-item__rating\">\n        ").concat(_this.getRatingHtml(rating), "\n      </ul>\n      <h3 class=\"book-item__title\">").concat(title, "</h3>\n    </li> \n  ")
    );
  }).join('');
};
/* 평점(rating)에 따라 html을 다르게 생성한다.
 * 예1: 평점이 8인 경우, 노란색 별 아이콘 4개를 생성하고
 *     색깔 없는 별 아이콘 1개를 생성한다.
 * 예2: 평점이 5인 경우, 노란색 별 아이콘 2개를 생성하고
 *     반쪽 별 아이콘 1개를 생성하고, 색깔 없는 별 아이콘 2개를 생성한다.
 */


BookList.getRatingHtml = function (_rating) {
  var html = '';
  var rating = parseInt(_rating, 10);

  if (rating % 2 === 0) {
    var starCount = rating / 2;

    for (var i = 0; i < starCount; i++) {
      html += '<li><i class="fa-solid fa-star"></i></li>';
    }

    for (var _i = 0; _i < 5 - starCount; _i++) {
      html += '<li><i class="fa-regular fa-star"></i></li>';
    }
  } else {
    var _starCount = Math.floor(rating / 2);

    for (var _i2 = 0; _i2 < _starCount; _i2++) {
      html += '<li><i class="fa-solid fa-star"></i></li>';
    }

    html += '<li><i class="fa-solid fa-star-half-stroke"></i></li>';

    for (var _i3 = 0; _i3 < 4 - _starCount; _i3++) {
      html += '<li><i class="fa-regular fa-star"></i></li>';
    }
  }

  return html;
};

var _default = BookList;
exports["default"] = _default;