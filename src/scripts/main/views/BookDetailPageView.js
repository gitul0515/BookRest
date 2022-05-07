import View from './View.js';

const BookDetailPageView = Object.create(View);

BookDetailPageView.setup = function (element) {
  this.init(element);
  return this;
};

BookDetailPageView.render = function (data) {
  const html = this.getHtml(data);
  const node = this.createNode(html);
  this.element.replaceChildren(node);

  this.bindElement();
  this.bindEvent();
};

BookDetailPageView.getHtml = function (data) {
  if (!data) {
    throw new Error('책 data가 존재하지 않습니다.');
  }

  const { title, authors, publisher, thumbnail, notes } = data;
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
      <h1 class="detail-page__title">${this.getWithoutParenthesis(title)}</h1>
      <div class="detail-page__informaion">
        <div class="detail-page__thumbnail">
          <img src="${thumbnail}" alt="썸네일 이미지"/>
        </div>
        <div class="detail-page__description">
          <span class="detail-page__authors">${authors[0]}</span>
          <span class="detail-page__publisher">${publisher}</span>
        </div>
      </div>
    </header>
    <section class="detail-page__content">
      ${
        notes.length > 0
          ? `<ul class="detail-page__note-list">
              ${this.getNoteListHtml(notes)}
            </ul>`
          : `<p class="detail-page__not-found-message">불러올 노트가 없어요...
          <br>지금 첫 노트를 작성해 보세요 :)
          </p>`
      }
    </section>
  `;
};

BookDetailPageView.getNoteListHtml = function (notes) {
  console.log(notes);
  if (!notes) {
    throw new Error('notes가 존재하지 않습니다.');
  }
  let html = `<button class="button--sort">나중에 작성한 노트부터</button>`;
  html += notes
    .map(
      ({ id, createdAt, content, page }) => /* html */ `
      <li class="note-item" data-id=${id}>
        <header class="note-item__header">
          <h3 class="note-item__label">
            <i class="fa-solid fa-thumbtack"></i>
            책 속 문장
          </h3>
          <p class="note-item__created-at">${createdAt.substring(0, 12)}</p>
        </header>
        <section class="note-item__content">
          <p>${content}</p>
          <span class="note-item__page">p. ${page}</span>
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
  return html;
};

// title에서 괄호로 둘러싸인 부분을 제거한다.
BookDetailPageView.getWithoutParenthesis = function (title) {
  const index = title.indexOf('(');
  return index === -1 ? title : title.slice(0, index);
};

BookDetailPageView.bindElement = function () {
  this.prevBtn = this.element.querySelector('.detail-page__btn--prev');
};

BookDetailPageView.bindEvent = function () {
  this.prevBtn.addEventListener('click', () => {
    this.dispatch('@prevClick');
  });
};

export default BookDetailPageView;
