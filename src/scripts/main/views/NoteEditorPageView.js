import View from './View.js';

const NoteEditorPageView = Object.create(View);

NoteEditorPageView.setup = function (element) {
  this.init(element);
  return this;
};

NoteEditorPageView.render = function (data) {
  if (!data) {
    throw new Error('data가 존재하지 않습니다.');
  }
  this.data = data;

  const html = this.getHtml();
  const node = this.createNode(html);
  this.element.replaceChildren(node);

  this.bindElement();
  this.bindEvent();
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
        <textarea class="editor__input" placeholder="노트 내용을 입력해보세요."></textarea>
      </section>
    </section>
  `;
};

NoteEditorPageView.bindElement = function () {
  this.escBtn = this.element.querySelector('.editor__btn--esc');
};

NoteEditorPageView.bindEvent = function () {
  this.escBtn.addEventListener('click', () => {
    const { id } = this.data;
    this.dispatch('@escClick', { id });
  });
};
export default NoteEditorPageView;
