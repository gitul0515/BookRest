import View from './View.js';
import BookListView from './BookListView.js';

const BookPageView = Object.create(View);

BookPageView.setup = function(element) {
  this.init(element);
  this.bindEvent();
  return this;
}

BookPageView.bindEvent = function() {

};

BookPageView.render = function() {
  const html = this.getHeaderHtml() + this.getContentHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

BookPageView.getHeaderHtml = function() {
  return `<header class="header">
    <h1 class="header__title">나의 서재</h1>
    <h3 class="header__message">20권의 책을 다 읽으셨어요!</h3>
  </header>`;
};

BookPageView.getContentHtml = function() {
  return `<div class="content">
    <form class="search-form" action="" method="get">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input 
        type="text" 
        placeholder="등록한 책을 검색해보세요"
        autofocus
      >
    </form>
    <button class="button--sort">제목 순서로</button>
    <ul class="book-list"></ul>
  </div>`;
};

BookPageView.createElement = function(string) {
  const temp = document.createElement('template');
  temp.innerHTML = string;
  return temp.content;
}

export default BookPageView;