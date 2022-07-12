import View from './View.js';
import BookModel from '../models/BookModel.js';

const NotePageView = Object.create(View);

NotePageView.setup = function (element) {
  this.init(element);
  this.render();
};

NotePageView.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
  this.bindElement();
  this.setEvent();
};

NotePageView.getHtml = function () {
  return /* html */ `
    <header class="header">
      <h1 class="header__title">나의 노트</h1>
      <h3 class="header__message">${BookModel.getNumberOfNotes()}개의 노트를 작성하셨군요!</h3>
    </header>
    <div class="content content--note">
      <div class="note__tab-container">
        <a class="note__tab-item note__tab-item--random" href="note/random">
          <h2>랜덤 노트</h2>
          <h3>노트를 읽으세요!</h3>
        </a>
        <a class="note__tab-item note__tab-item--favorite" href="note/favorite">
          <h2>좋아하는 노트</h2>
          <h3>베스트 노트</h3>
        </a>
      </div>
      <ul class="note-list"></ul>
    </div>
  `;
};

NotePageView.bindElement = function () {
  this.randomTab = this.element.querySelector('.note__tab-item--random');
  this.favoriteTab = this.element.querySelector('.note__tab-item--favorite');
};

NotePageView.setEvent = function () {
  this.randomTab.addEventListener('click', (e) => this.onClickTab(e));
  this.favoriteTab.addEventListener('click', (e) => this.onClickTab(e));
};

NotePageView.onClickTab = function (e) {
  e.preventDefault();
  const tab = e.target.closest('a');
  if (tab) {
    const path = tab.getAttribute('href');
    this.dispatch('@clickNoteTab', { path });
  }
};

export default NotePageView;
