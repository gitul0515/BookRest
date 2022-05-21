import View from './View.js';
import { setupIntersectionObserver } from '../../utils/intersectionObserver.js';

const HomeSearchPageView = Object.create(View);

HomeSearchPageView.setup = function (element) {
  this.init(element);
  this.searchWord = null;
  this.searchPage = 1;
  this.observer = setupIntersectionObserver(() => {
    console.log('관찰대상 감지!');
  });
};

HomeSearchPageView.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
  this.bindElement();
  this.bindEvent();
};

HomeSearchPageView.getHtml = function () {
  return /* html */ `
    <header class="search-page__header">
      <button class="search-page__btn">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </header>
    <div class="search-page__content">
      <h1 class="search-page__title">책을 찾아보세요!</h1>
      <form class="search-page__form">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
        class="search-page__input"
        type="text"
        placeholder="검색할 책을 입력해주세요."
        autofocus
        >
      </form>
    </div>
    <div class="search-page__list-container"></div>
  `;
};

HomeSearchPageView.bindElement = function () {
  this.btn = this.element.querySelector('.search-page__btn');
  this.form = this.element.querySelector('.search-page__form');
  this.input = this.element.querySelector('.search-page__input');
  this.div = this.element.querySelector('.search-page__list-container');
};

HomeSearchPageView.bindEvent = function () {
  this.btn.addEventListener('click', () => this.onPrevClick());
  this.form.addEventListener('submit', (e) => this.onSubmit(e));
  this.div.addEventListener('click', (e) => this.onClick(e));
};

HomeSearchPageView.onPrevClick = function () {
  this.dispatch('@backToHome');
};

HomeSearchPageView.onSubmit = function (e) {
  e.preventDefault();
  const word = this.input.value;
  console.log(this.searchWord);
  if (word.length > 1) {
    this.dispatch('@search-api', { word });
    this.form.reset();
  }
};

HomeSearchPageView.renderList = function (data) {
  this.bookData = data;
  if (!this.bookData) {
    return;
  }
  if (this.bookData.length === 0) {
    this.div.innerHTML = `
      <p>
        결과가 없어요.<br>
        다시 한 번 검색해 보시겠어요?
      </p>`;
    return;
  }
  const html = this.getListHtml();
  const node = this.createNode(html);
  this.div.replaceChildren(node);

  const lastItem = this.div.querySelector('.search-item:last-child');
  this.observer.observe(lastItem);
};

HomeSearchPageView.getListHtml = function () {
  return /* html */ `
  <ul class="search-list">
    ${this.bookData
      .map(({ title, authors, publisher, thumbnail }, index) => {
        return `<li class="search-item" data-index=${index}>
        <div class="search-item__thumbnail" >
          <img src=${thumbnail} alt="책 표지 이미지" onerror="this.src='/src/asset/image/book/book-no.jpg'">
        </div>
        <div class="search-item__description">
          <h2 class="search-item__title">
            ${this.getWithoutParenthesis(title)}
          </h2>
          <div>
            <span class="search-item__authors">${authors[0]}</span>
            <span class="search-item__publisher">${publisher}</span>
          </div>
        </div>
      </li>`;
      })
      .join('')}
  </ul>
  `;
};

// title에서 괄호로 둘러싸인 부분을 제거한다.
HomeSearchPageView.getWithoutParenthesis = function (title) {
  const index = title.indexOf('(');
  return index === -1 ? title : title.slice(0, index);
};

HomeSearchPageView.onClick = function (e) {
  const li = e.target.closest('.search-item');
  if (li) {
    const index = parseInt(li.dataset.index, 10);
    const bookData = this.bookData[index];
    this.dispatch('@clickItem', { bookData });
  }
};

HomeSearchPageView.createNode = function (string) {
  const template = document.createElement('template');
  template.innerHTML = string;
  return template.content;
};

/* 
  IntersectionObserver
  : 관찰하는 대상(마지막 li 요소)가 뷰포트에 들어오면 서버에 데이터를 요청한다. 
*/
HomeSearchPageView.setIntersectionObserver = function () {
  const observerOption = {
    threshold: 0.5,
  };
  this.observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('탐지 완료!');
      }
    });
  }, observerOption);
};

export default HomeSearchPageView;
