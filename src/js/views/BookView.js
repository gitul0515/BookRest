import View from './View.js';

const BookView = Object.create(View);

BookView.setup = function(element) {
  this.init(element);
  this.bindEvents();
  return this;
}

BookView.bindEvents = function() {

};

BookView.render = function() {
  const html = this.getHeaderHtml() + this.getContentHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

BookView.getHeaderHtml = function() {
  return `<header class="header">
    <h1 class="header__title">나의 서재</h1>
    <h3 class="header__message">20권의 책을 다 읽으셨어요!</h3>
  </header>`;
};

BookView.getContentHtml = function() {
  return `<div class="content">
    <p>hello<p>
  </div>`;
};

BookView.createElement = function(string) {
  const temp = document.createElement('template');
  temp.innerHTML = string;
  return temp.content;
}

export default BookView;