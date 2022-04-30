import View from './View.js';

const BookDetailPageView = Object.create(View);

BookDetailPageView.setup = function (element) {
  this.init(element);
  return this;
};

BookDetailPageView.render = function () {
  const html = this.getHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);

  this.bindElement();
  this.bindEvent();
};

BookDetailPageView.getHtml = function () {
  return `
    <header class="detail-page__header">
      <div class="detail-page__btns"> 
        <button class="detail-page__btn detail-page__btn--prev">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="detail-page__btn detail-page__btn--menu">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>
      <h1 class="detail-page__title">데미안</h1>
      <div class="detail-page__informaion">
        <div class="detail-page__thumbnail">
          <img src="/src/asset/image/book/book-4.jpg" alt="썸네일 이미지"/>
        </div>
        <div class="detail-page__description">
          <span class="detail-page__authors">헤르만 헤세</span>
          <span class="detail-page__publisher">민음사</span>
        </div>
      </div>
    </header>
    <ul class="detail-page__note-list"></ul>
  `;
};

BookDetailPageView.bindElement = function () {};

BookDetailPageView.bindEvent = function () {};

export default BookDetailPageView;
