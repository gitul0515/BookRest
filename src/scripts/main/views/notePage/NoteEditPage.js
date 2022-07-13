import View from '../common.js';
import { getCurrentTime } from '../../../utils/date.js';
import { generateId } from '../../../utils/uniqueId.js';

const NoteEditPage = Object.create(View);

NoteEditPage.setup = function (element) {
  this.init(element);
  return this;
};

NoteEditPage.render = function (id) {
  this.bookId = id;

  const html = this.getHtml();
  this.replaceChildren(html);

  this.bindElement();
  this.bindEvent();
};

NoteEditPage.getHtml = function () {
  return /* html */ `
    <section class="editor">
      <header class="editor__header">
        <button class="editor__btn--esc">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <button class="editor__btn--save">저장하기</button>
      </header>
      <section class="editor__content">
        <section class="editor__note-information">
          <div>
            <button class="editor__btn--label">
            <i class="fa-solid fa-book-bookmark"></i>
              책 속 문장
            </button>
            <button class="editor__btn--page">페이지</button>
          </div>
          <p class="editor__created-at">${getCurrentTime()}</p>
        </section>
        <textarea class="editor__input" placeholder="노트 내용을 입력해보세요."></textarea>
      </section>
    </section>
  `;
};

NoteEditPage.bindElement = function () {
  this.escBtn = this.element.querySelector('.editor__btn--esc');
  this.saveBtn = this.element.querySelector('.editor__btn--save');
  this.pageBtn = this.element.querySelector('.editor__btn--page');
  this.createdAt = this.element.querySelector('.editor__created-at');
  this.input = this.element.querySelector('.editor__input');
};

NoteEditPage.bindEvent = function () {
  this.escBtn.addEventListener('click', () => {
    this.dispatch('@escClick');
  });
  this.saveBtn.addEventListener('click', () => this.onSaveClick());
};

NoteEditPage.onSaveClick = function () {
  if (this.input.value.length > 1) {
    const bookId = this.bookId;
    const newNote = this.createNewNote();
    this.dispatch('@saveClick', { bookId, newNote });
  }
};

NoteEditPage.createNewNote = function () {
  return {
    id: generateId(),
    content: this.input.value,
    createdAt: this.createdAt.textContent,
    page: this.pageBtn.textContent === '페이지' ? 0 : Number(this.pageBtn.textContent),
    readCount: 0,
    isFavorite: false,
  };
};

export default NoteEditPage;
