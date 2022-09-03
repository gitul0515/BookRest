import View from '../common.js';

const BookDetailPage = Object.create(View);

BookDetailPage.setup = function (element) {
  this.init(element);
  return this;
};

BookDetailPage.render = function (data) {
  this.element.innerHTML = this.getHtml(data);
  this.bindElement();
  this.setEvent();
};

BookDetailPage.getHtml = function (data) {
  if (!data) {
    throw new Error('책 data가 존재하지 않습니다.');
  }
  this.data = data;
  const { title, authors, publisher, thumbnail, notes } = this.data;
  return /* html */ `
    <header class="detail-page__header">
      <div class="detail-page__btns"> 
        <button class="detail-page__btn detail-page__btn--prev">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="detail-page__btn detail-page__btn--menu">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>
      <h1 class="detail-page__title">${this.removeParenthesis(title)}</h1>
      <div class="detail-page__informaion">
        <div class="detail-page__thumbnail">
          <img src="${thumbnail}" alt="썸네일 이미지"/>
        </div>
        <div class="detail-page__description">
          <span class="detail-page__authors">${authors[0]}</span>
          <span class="detail-page__publisher">${publisher}</span>
        </div>
      </div>
      <button class="detail-page__btn--add">
        <i class="fa-solid fa-file-circle-plus"></i>
      </button>
    </header>
    <section class="detail-page__content">
      ${
        notes.length > 0
          ? `<ul class="detail-page__note-list">
              ${this.getNoteListHtml(notes)}
            </ul>`
          : `<p class="detail-page__not-found-message">저장한 노트가 없어요...
          <br>지금 첫 노트를 작성해 보세요 :)
          </p>`
      }
    </section>
  `;
};

BookDetailPage.getNoteListHtml = function (notes) {
  let result = `<button class="button--sort">나중에 작성한 노트부터</button>`;
  result += notes
    .map((note) => {
      const { id, createdAt, content, page, readCount } = note;
      return /* html */ `
      <li class="note-item" data-id=${id}>
        <header class="note-item__header">
          <h3 class="note-item__label">
            <i class="fa-solid fa-thumbtack"></i>
            책 속 문장
          </h3>
          <p class="note-item__created-at">${createdAt}</p>
        </header>
        <section class="note-item__content">
          <p class="note-item__text">${content}</p>
          <div>
            <span class="note-item__read-count">${
              readCount > 0 ? `${readCount}번 읽었어요.` : ``
            }</span>
            <span class="note-item__page">${page > 0 ? `p. ${page}` : ''}</span>
          </div>
        </section>
        <footer class="note-item__footer">
          <button class="note-item__btn note-item__btn--options">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </footer>
      </li>
  `;
    })
    .join('');
  return result;
};

BookDetailPage.removeParenthesis = function (title) {
  const index = title.indexOf('(');
  return index === -1 ? title : title.slice(0, index);
};

BookDetailPage.bindElement = function () {
  this.prevBtn = this.element.querySelector('.detail-page__btn--prev');
  this.addBtn = this.element.querySelector('.detail-page__btn--add');
};

BookDetailPage.setEvent = function () {
  this.prevBtn.addEventListener('click', () => {
    this.dispatch('@prevClick');
  });

  this.addBtn.addEventListener('click', () => {
    const { id } = this.data;
    this.dispatch('@addClick', { id });
  });
};

export default BookDetailPage;
