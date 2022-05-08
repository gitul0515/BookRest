import View from './View.js';

const NoteEditorPageView = Object.create(View);

NoteEditorPageView.setup = function (element) {
  this.init(element);
  return this;
};

NoteEditorPageView.render = function (notes) {
  if (!Array.isArray(notes)) {
    throw new TypeError('notes의 타입이 Array가 아닙니다.');
  }
  this.notes = notes;

  const html = this.getHtml();
  const node = this.createNode(html);
  this.element.replaceChildren(node);
};

NoteEditorPageView.getHtml = function () {
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
          <p class="editor__created-at">2022년 5월 8일 23:21</p>
        </section>
      </section>
    </section>
  `;
};

export default NoteEditorPageView;
