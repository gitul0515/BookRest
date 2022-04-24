import View from './View.js';

const BookDetailPageView = Object.create(View);

BookDetailPageView.setup = function (element) {
  this.init(element);
  console.log(this.element);
  // this.render();
  this.bindElement();
  this.bindEvent();
};

BookDetailPageView.render = function () {
  const html = this.getHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

BookDetailPageView.getHtml = function () {
  return `<h1>hello</h1>`;
};

BookDetailPageView.bindElement = function () {};

BookDetailPageView.bindEvent = function () {};

export default BookDetailPageView;
