import View from '../common.js';
import SearchList from './SearchList.js';
import { removeSpace } from '/src/scripts/utils/format.js';

const HomePage = Object.create(View);

HomePage.setup = function (element) {
  this.init(element);
  this.initState();
  this.render();
  this.bindElement();
  this.setEvent();
  this.setupSubComponent();
};

HomePage.initState = function () {
  this.state = {
    searchWord: '',
    books: [],
    page: 1,
    isEndPage: false,
  };
};

HomePage.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;
    SearchList.setState(this.state);
  }
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
  this.list.addEventListener('click', (e) => this.onClickBook(e));
};

HomePage.setupSubComponent = function () {
  SearchList.setup(this.list, this.state, this.onNextPage);
};

HomePage.onSubmit = function (e) {
  e.preventDefault();
  const searchWord = this.input.value;
  if (searchWord) {
    this.initState();
    this.dispatch('@search-book-api', { searchWord, page: 1 });
    this.form.reset();
  }
};

HomePage.onNextPage = function ({ searchWord, page }) {
  HomePage.dispatch('@search-book-api', { searchWord, page });
};

HomePage.onClickBook = function (e) {
  const li = e.target.closest('.search-item');
  if (li) {
    const { id } = li.dataset;
    const clickedBook = this.state.books.find(({ isbn }) => removeSpace(isbn) === id);
    this.dispatch('@clickBook', { clickedBook });
  }
};

export default HomePage;
