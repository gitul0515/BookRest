import View from './View.js';
import ModalView from './ModalView.js';
import BookListView from './BookListView.js';
import BookModel from '../models/BookModel.js';

const BookPageView = Object.create(View);

BookPageView.setup = function (element) {
  this.init(element);
  this.render();
  this.bindElement();
  this.bindEvent();
  BookListView.setup(this.ul);
};

BookPageView.render = function () {
  const html = this.getHtml();
  BookPageView.replaceChildren(html);
};

BookPageView.getHtml = function () {
  return /* html */ `
    <header class="header">
      <h1 class="header__title">나의 서재</h1>
      <h3 class="header__message">${BookModel.getNumberOfBooks()}권의 책을 다 읽으셨어요!</h3>
    </header>
    <div class="content content--book">
      <form class="search-form" action="" method="get">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input 
          class="search-form__input"
          type="text" 
          placeholder="등록한 책을 검색해보세요"
          pattern=".{2,}" 
          title="두 글자 이상 입력하세요"
        >
      </form>
      <button class="button--sort">제목 순서로</button>
      <ul class="book-list"></ul>
    </div>
  `;
};

BookPageView.bindElement = function () {
  this.form = this.element.querySelector('.search-form');
  this.input = this.element.querySelector('.search-form__input');
  this.sortButton = this.element.querySelector('.button--sort');
  this.ul = this.element.querySelector('.book-list');
};

BookPageView.bindEvent = function () {
  this.form.addEventListener('submit', (e) => this.onSearch(e));
  this.sortButton.addEventListener('click', () => this.onClickButton());
  this.ul.addEventListener('click', (e) => this.onClickList(e));
};

BookPageView.onSearch = function (e) {
  e.preventDefault();
  const { value } = this.input;
  this.dispatch('@search', { value });
  this.input.value = '';
};

BookPageView.onClickButton = function () {
  const modalContent = {
    title: '정렬 방법을 선택해주세요.',
    key: 'sort-book-by',
    items: [
      {
        title: '최근에 읽은 책부터',
        value: 'new',
      },
      {
        title: '먼저 읽은 책부터',
        value: 'old',
      },
      {
        title: '제목 순서로',
        value: 'title',
      },
      {
        title: '제목 역순으로',
        value: 'title-reverse',
      },
      {
        title: '높은 별점부터',
        value: 'high-rating',
      },
      {
        title: '낮은 별점부터',
        value: 'low-rating',
      },
    ],
  };
  ModalView.render('list-6', modalContent);
};

BookPageView.onClickList = function (e) {
  const li = e.target.closest('li');
  if (li) {
    const { id } = li.dataset;
    this.dispatch('@detailPage', { id });
  }
};

BookPageView.setSortButtonText = function (sortBy) {
  this.sortButton.textContent = sortBy;
};

export default BookPageView;
