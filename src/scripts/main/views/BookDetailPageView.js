import View from './View.js';

const BookDetailPageView = Object.create(View);

BookDetailPageView.setup = function (element) {
  this.init(element);
  return this;
};

BookDetailPageView.render = function (data) {
  const html = this.getHtml(data);
  const element = this.createElement(html);
  this.element.replaceChildren(element);

  this.bindElement();
  this.bindEvent();
};

BookDetailPageView.getHtml = function (data) {
  if (!data) {
    throw new Error('책 data가 존재하지 않습니다.');
  }

  const { title, authors, publisher, thumbnail } = data;
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
    <ul class="detail-page__note-list"></ul>
  `;
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
    this.emit('@prevClick');
  });
};

export default BookDetailPageView;
