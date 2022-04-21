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
          책의 문장
        </h3>
        <div class="note-item__information">
          <div class="note-item__book-informaion">
            <div>
              <h3 class="note-item__book-title">딥 워크</h3>
              <span class="note-item__book-author">칼 뉴포트</span>
            </div>
            <img class="note-item__book-thumbnail" src="./asset/image/book/book-1.jpg"/>
          </div>
          <p class="note-item__created-at">2022년</p>
        </div>
      </header>
      <section class="note-item__content"></section>
      <footer class="note-item__footer"></footer>
    </li>
  `;
};

export default NoteListView;
