import View from '../common.js';
import SearchList from './SearchList.js';

const HomePage = Object.create(View);

HomePage.setup = function (element) {
  this.init(element);
  this.render();
  this.bindElement();
  this.setEvent();
  SearchList.setup(this.list, this.setSearchList);
};

HomePage.render = function () {
  this.element.innerHTML = this.getHtml();
};

HomePage.getHtml = function () {
  return /* html */ `
    <header class="header">
      <h1 class="header__title">북레스트</h1>
      <h3 class="header__message">오늘은 어떤 책을 읽으셨나요?</h3>
    </header>
    <div class="search-page__content">
      <form class="search-page__form">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
        class="search-page__input"
        type="text"
        placeholder="읽고 있는 책을 찾아보세요"
        autofocus
        >
      </form>
      <ul class="search-list"></ul>
    </div>
  `;
};

HomePage.bindElement = function () {
  this.form = this.element.querySelector('.search-page__form');
  this.input = this.element.querySelector('.search-page__input');
  this.list = this.element.querySelector('.search-list');
};

HomePage.setEvent = function () {
  this.form.addEventListener('submit', (e) => this.onSubmit(e));
};

HomePage.onSubmit = function (e) {
  e.preventDefault();
  const searchWord = this.input.value;
  if (searchWord) {
    this.initSearchList();
    this.dispatch('@search-book-api', { searchWord, page: 1 });
    this.form.reset();
  }
};

HomePage.setSearchList = function ({ searchWord, page }) {
  HomePage.dispatch('@search-book-api', { searchWord, page });
};

HomePage.initSearchList = function () {
  SearchList.element.innerHTML = '';
  SearchList.initState();
};

export default HomePage;
