import View from './View.js';
import { toggleClass } from '../../utils/className.js';

const NoteListView = Object.create(View);

NoteListView.setup = function (element) {
  this.init(element);
  this.bindEvent();
  return this;
};

NoteListView.bindEvent = function () {
  this.element.addEventListener('click', (e) => this.onClick(e));
};

NoteListView.render = function (notes) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return;
  }
  this.notes = notes;
  const html = this.getHtml();
  NoteListView.replaceChildren(html);
};

NoteListView.getHtml = function () {
  return this.notes
    .map(
      ({
        id,
        title,
        authors,
        thumbnail,
        createdAt,
        content,
        page,
        readCount,
        isFavorite,
      }) => /* html */ `
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
            <span class="note-item__read-count">${
              readCount > 0 ? `${readCount}번 읽었어요.` : ``
            }</span>
            <span class="note-item__page">${page > 0 ? `p. ${page}` : ' '}</span>
          </div>
        </section>
        <footer class="note-item__footer">
          <div class="note-item__btns">
            <button class="note-item__btn note-item__btn--count">
              ${
                readCount > 0
                  ? `<i class="fa-solid fa-check active"></i>`
                  : `<i class="fa-solid fa-check"></i>`
              }
            </button>
            <button class="note-item__btn note-item__btn--favorite">
              ${
                isFavorite
                  ? `<i class="fa-solid fa-heart active"></i>`
                  : `<i class="fa-regular fa-heart"></i>`
              }
            </button>
            <button class="note-item__btn note-item__btn--comment">
              <i class="fa-regular fa-comment-dots"></i>
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

NoteListView.onClick = function ({ target }) {
  const noteItem = target.closest('.note-item');
  if (noteItem) {
    const id = noteItem.dataset.id;
    if (target.matches('.note-item__btn--count')) {
      const newNotes = this.notes.map((note) => {
        if (note.id === id) {
          note.readCount += 1;
        }
        return note;
      });
      this.render(newNotes); // 낙관적 업데이트
      this.dispatch('@count', { id }); // 데이터베이스(북모델) 갱신
      return;
    }
    if (target.matches('.note-item__btn--favorite')) {
      // favorite 버튼 클릭 시, heartIcon의 스타일을 변경한다.
      const heartIcon = target.querySelector('.fa-heart');
      toggleClass(heartIcon, 'fa-regular', 'fa-solid', 'active');
      this.dispatch('@favorite', { id }); // 데이터베이스(북모델) 갱신
      return;
    }
  }
};

export default NoteListView;
