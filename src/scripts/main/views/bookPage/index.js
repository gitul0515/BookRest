import View from '../common.js';
import Modal from '../modal.js';
import BookList from './BookList.js';
import BookModel from '../../models/BookModel.js';

const BookPage = Object.create(View);

BookPage.setup = function (element) {
  this.init(element);
  this.render();
  this.bindElement();
  this.setEvent();
  BookList.setup(this.list);
};

BookPage.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
};

BookPage.getHtml = function () {
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
      ${BookModel.getNumberOfBooks() ? `<button class="button--sort">제목 순서로</button>` : ''}
      <ul class="book-list"></ul>
    </div>
  `;
};

BookPage.bindElement = function () {
  this.form = this.element.querySelector('.search-form');
  this.input = this.element.querySelector('.search-form__input');
  this.sortButton = this.element.querySelector('.button--sort');
  this.list = this.element.querySelector('.book-list');
};

BookPage.setEvent = function () {
  this.form.addEventListener('submit', (e) => this.onSearch(e));
  this.sortButton?.addEventListener('click', () => this.onClickButton());
  this.list.addEventListener('click', (e) => this.onClickList(e));
};

BookPage.onSearch = function (e) {
  e.preventDefault();
  const { value } = this.input;
  this.dispatch('@search', { value });
  this.input.value = '';
};

BookPage.onClickButton = function () {
  const modalContent = {
    title: '정렬 방법을 선택해주세요.',
    key: 'sort-book-by',
    items: [
      {
        title: '제목 순서로',
        value: 'title',
      },
      {
        title: '제목 역순으로',
        value: 'title-reverse',
      },
    ],
  };
  Modal.render('list-2', modalContent);
};

BookPage.onClickList = function (e) {
  const li = e.target.closest('li');
  if (li) {
    const { id } = li.dataset;
    this.dispatch('@detailPage', { id });
  }
};

BookPage.setSortButtonText = function (sortBy) {
  if (this.sortButton) {
    this.sortButton.textContent = sortBy;
  }
};

export default BookPage;
