import View from '../common.js';
import HomePage from './index.js';

const HomeSearchPageView = Object.create(View);

HomeSearchPageView.setup = function (element) {
  this.init(element);
  this.initState();
  const innerFunc = throttle(() => this.addNextPage(), 0);
  this.observer = setupIntersectionObserver(() => innerFunc());
  this.lastItem = null;
};

HomeSearchPageView.initState = function () {
  this.searchWord = null;
  this.searchResult = [];
  this.searchPage = 1;
  this.isEndPage = false;
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
    <ul class="search-list"></ul>
  `;
};

// HomeSearchPageView.bindElement = function () {
//   this.btn = this.element.querySelector('.search-page__btn');
//   this.form = this.element.querySelector('.search-page__form');
//   this.input = this.element.querySelector('.search-page__input');
//   this.ul = this.element.querySelector('.search-list');
// };

// HomeSearchPageView.bindEvent = function () {
//   this.btn.addEventListener('click', () => this.onPrevClick());
//   this.form.addEventListener('submit', (e) => this.onSubmit(e));
//   this.ul.addEventListener('click', (e) => this.onClick(e));
// };

// HomeSearchPageView.onPrevClick = function () {
//   this.dispatch('@clickPrev');
// };

HomeSearchPageView.onSubmit = function (e) {
  e.preventDefault();
  const word = this.input.value;
  if (word.length > 1) {
    this.ul.innerHTML = '';
    this.searchWord = word;
    this.searchPage = 1;
    this.dispatch('@search-api', { word, page: this.searchPage });
    this.form.reset();
  }
};

HomeSearchPageView.addNextPage = function () {
  if (!this.isEndPage) {
    this.searchPage += 1;
    this.dispatch('@search-api', { word: this.searchWord, page: this.searchPage });
  }
};

HomeSearchPageView.renderList = function (data, meta) {
  if (!data) {
    return;
  }
  if (data.length === 0) {
    this.ul.innerHTML = `
      <p>
        결과가 없어요.<br>
        다시 한 번 검색해 보시겠어요?
      </p>`;
    return;
  }
  const html = this.getListHtml(data);
  const node = this.createNode(html);
  this.ul.appendChild(node);
  this.searchResult = [...this.searchResult, ...data];
  this.isEndPage = meta['is_end'];

  const nextItem = this.ul.querySelector('.search-item:last-child');
  if (nextItem) {
    if (this.lastItem) {
      this.observer.unobserve(this.lastItem);
    }
    this.lastItem = nextItem;
    this.observer.observe(this.lastItem);
  }
};

// HomeSearchPageView.getListHtml = function (data) {
//   return data
//     .map(({ title, authors, publisher, thumbnail, isbn }) => {
//       return /* html */ `
//         <li class="search-item" data-id=${isbn.replace(' ', '')}>
//           <div class="search-item__thumbnail" >
//             <img
//               src=${thumbnail}
//               alt="책 표지 이미지"
//               onerror="this.src='/src/asset/image/book/book-no.jpg'"
//             >
//           </div>
//           <div class="search-item__description">
//             <h2 class="search-item__title">
//               ${this.getWithoutParenthesis(title)}
//             </h2>
//             <div>
//               <span class="search-item__authors">${authors[0]}</span>
//               <span class="search-item__publisher">${publisher}</span>
//             </div>
//           </div>
//         </li>
//       `;
//     })
//     .join('');
// };

// title에서 괄호로 둘러싸인 부분을 제거한다.
// HomeSearchPageView.getWithoutParenthesis = function (title) {
//   const index = title.indexOf('(');
//   return index === -1 ? title : title.slice(0, index);
// };

// HomeSearchPageView.onClick = function (e) {
//   const li = e.target.closest('.search-item');
//   if (li) {
//     const { id } = li.dataset;
//     const bookData = this.searchResult.find((book) => book.isbn.replace(' ', '') === id);
//     this.dispatch('@clickItem', { bookData });
//   }
// };

export default HomeSearchPageView;
