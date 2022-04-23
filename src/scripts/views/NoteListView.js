import View from './View.js';

const NoteListView = Object.create(View);

NoteListView.setup = function (element) {
  this.init(element);
  return this;
};

NoteListView.render = function () {
  const html = this.getHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

NoteListView.getHtml = function () {
  return `
    <li class="note-item">
      <header class="note-item__header">
        <h3 class="note-item__label">
          <i class="fa-solid fa-thumbtack"></i>
          책 속 문장
        </h3>
        <div class="note-item__information">
          <div class="note-item__book-informaion">
            <div>
              <h3 class="note-item__book-title">딥 워크</h3>
              <span class="note-item__book-author">칼 뉴포트</span>
            </div>
            <img class="note-item__book-thumbnail" src="/src/asset/image/book/book-1.jpg"/>
          </div>
          <p class="note-item__created-at">2022년 4월 9일 12:20</p>
        </div>
      </header>
      <section class="note-item__content">
        <p>집중하는 삶이 최선의 삶이다.</p>
        <span class="note-item__page">p. 137</span>
      </section>
      <footer class="note-item__footer">
        <div class="note-item__btns">
          <button class="note-item__btn note-item__btn--count">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="note-item__btn note-item__btn--favorite">
            <i class="fa-regular fa-heart"></i>
          </button>
          <button class="note-item__btn note-item__btn--comment">
            <i class="fa-regular fa-comment"></i>
          </button>
          <button class="note-item__btn note-item__btn--options">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </footer>
    </li>
    <li class="note-item">
    <header class="note-item__header">
      <h3 class="note-item__label">
        <i class="fa-solid fa-thumbtack"></i>
        책 속 문장
      </h3>
      <div class="note-item__information">
        <div class="note-item__book-informaion">
          <div>
            <h3 class="note-item__book-title">딥 워크</h3>
            <span class="note-item__book-author">칼 뉴포트</span>
          </div>
          <img class="note-item__book-thumbnail" src="/src/asset/image/book/book-1.jpg"/>
        </div>
        <p class="note-item__created-at">2022년 4월 9일 12:20</p>
      </div>
    </header>
    <section class="note-item__content">
      <p>딥 워크</p>
      <span class="note-item__page">p. 137</span>
    </section>
    <footer class="note-item__footer">
      <div class="note-item__btns">
        <button class="note-item__btn note-item__btn--count">
          <i class="fa-solid fa-check"></i>
        </button>
        <button class="note-item__btn note-item__btn--favorite">
          <i class="fa-regular fa-heart"></i>
        </button>
        <button class="note-item__btn note-item__btn--comment">
          <i class="fa-regular fa-comment"></i>
        </button>
        <button class="note-item__btn note-item__btn--options">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>
    </footer>
  </li>
  `;
};

export default NoteListView;
