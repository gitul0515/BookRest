import View from './View.js';

const NoteListView = Object.create(View);

NoteListView.setup = function (element) {
  this.init(element);
  return this;
};

NoteListView.render = function (data) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }
  const html = this.getHtml(data);
  NoteListView.replaceChildren(html);
};

NoteListView.getHtml = function (data) {
  return data
    .map(
      ({ id, title, authors, thumbnail, createdAt, content, page }) => /* html */ `
      <li class="note-item" data-id=${id}>
        <header class="note-item__header">
          <h3 class="note-item__label">
            <i class="fa-solid fa-thumbtack"></i>
            책 속 문장
          </h3>
          <div class="note-item__information">
            <div class="note-item__book-informaion">
              <div>
                <h3 class="note-item__book-title">${this.getWithoutParenthesis(title)}</h3>
                <span class="note-item__book-author">${authors}</span>
              </div>
              <img class="note-item__book-thumbnail" src="${thumbnail}"/>
            </div>
            <p class="note-item__created-at">${createdAt}</p>
          </div>
        </header>
        <section class="note-item__content">
          <p>${content}</p>
          <span class="note-item__page">${page === 0 ? '' : `p. ${page}`}</span>
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
    `,
    )
    .join('');
};

NoteListView.getWithoutParenthesis = function (title) {
  const index = title.indexOf('(');
  return index === -1 ? title : title.slice(0, index);
};

export default NoteListView;
