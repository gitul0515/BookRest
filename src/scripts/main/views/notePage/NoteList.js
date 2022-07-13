import View from '../common.js';
import ModalView from '../modal.js';
import { toggleClass } from '../../../utils/className.js';

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
    html = this.getHtml();
  } else {
    html = this.getNotFoundHtml();
  }
  this.replaceChildren(html);
};

NoteList.getHtml = function () {
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

NoteList.getWithoutParenthesis = function (title) {
  const index = title.indexOf('(');
  return index === -1 ? title : title.slice(0, index);
};

NoteList.onClick = function ({ target }) {
  const noteItem = target.closest('.note-item');
  if (noteItem) {
    const id = noteItem.dataset.id;
    if (target.matches('.note-item__btn--count')) {
      this.dispatch('@count', { id });
      return;
    }
    if (target.matches('.note-item__btn--favorite')) {
      const heartIcon = target.querySelector('.fa-heart');
      toggleClass(heartIcon, 'fa-regular', 'fa-solid', 'active');
      this.dispatch('@favorite', { id });
      return;
    }
    if (target.matches('.note-item__btn--comment')) {
      const modalContent = {
        id,
        title: '메모하기',
        key: 'note-memo',
        placeholder: '이 노트에 대한 생각을 적어보세요.',
        buttonIcon: 'fa-solid fa-pen-to-square',
      };
      ModalView.render('form', modalContent);
      return;
    }
    if (target.matches('.note-item__btn--options')) {
      const modalContent = {
        id,
        title: '작업을 선택해주세요.',
        key: 'note-option',
        items: [
          {
            title: '노트 읽은 횟수 초기화',
            value: 'init',
            icon: 'fa-solid fa-arrow-rotate-left',
          },
          {
            title: '노트 삭제',
            value: 'remove',
            icon: 'fa-solid fa-trash',
          },
        ],
      };
      ModalView.render('list-2', modalContent);
      return;
    }
  }
};

NoteList.getNotFoundHtml = function () {
  return ``;
};

export default NoteList;
