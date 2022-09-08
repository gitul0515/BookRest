import View from '../common.js';
import ModalView from '../modal.js';

const NoteList = Object.create(View);

NoteList.setup = function (element) {
  this.init(element);
  this.bindEvent();
  return this;
};

NoteList.bindEvent = function () {
  this.element.addEventListener('click', (e) => this.onClick(e));
};

NoteList.render = function (notes) {
  if (!Array.isArray(notes)) {
    return;
  }
  this.notes = notes;
  let html;
  if (notes.length) {
    html = this.getHtml(notes);
  } else {
    html = this.getNotFoundHtml();
  }
  this.replaceChildren(html);
};

NoteList.getHtml = function (notes) {
  return notes
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
          <p class="note-item__text">${content}</p>
          <div>
            <span class="note-item__page">${page > 0 ? `p. ${page}` : ' '}</span>
          </div>
        </section>
        <footer class="note-item__footer">
          <button class="note-item__btn note-item__btn--options">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </footer>
      </li>
    `,
    )
    .join('');
};

NoteList.getWithoutParenthesis = function (title) {
  const index = title.indexOf('(');
  return index === -1 ? title : title.slice(0, index);
};

NoteList.onClick = function ({ target }) {
  const noteItem = target.closest('.note-item');
  if (noteItem) {
    const id = noteItem.dataset.id;
    if (target.matches('.note-item__btn--options')) {
      const modalContent = {
        id,
        title: '작업을 선택해주세요.',
        key: 'note-option',
        items: [
          {
            title: '노트 삭제',
            value: 'remove',
            icon: 'fa-solid fa-trash',
          },
        ],
      };
      ModalView.render('list-1', modalContent);
      return;
    }
  }
};

NoteList.getNotFoundHtml = function () {
  return ``;
};

export default NoteList;
