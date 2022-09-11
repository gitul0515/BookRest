import View from '../common.js';
import { removeParenthesis, removeSpace } from '/src/scripts/utils/format.js';

const SearchList = Object.create(View);

SearchList.setup = function (element, initialState, onNextPage) {
  this.init(element);
  this.state = initialState;
  this.onNextPage = onNextPage;
};

SearchList.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;
    this.render();
  }
};

SearchList.render = function () {
  if (!this.state.books.length) {
    this.element.innerHTML = this.getNoResultHtml();
    return;
  }
  this.element.innerHTML = this.getListHtml(this.state.books); // Todo: 렌더링 최적화 필요
  this.setObserverTarget();
};

SearchList.getNoResultHtml = function () {
  return `<p>
    결과가 없습니다.<br>
    다시 검색해 보시겠어요?
  </p>`;
};

SearchList.getListHtml = function (books) {
  return books
    .map(({ title, authors, publisher, thumbnail, isbn }) => {
      return /* html */ `
      <li class="search-item" data-id=${removeSpace(isbn)}>
        <div class="search-item__thumbnail" >
          <img 
            src=${thumbnail} 
            alt="책 표지 이미지" 
            onerror="this.src='/src/asset/image/book/book-no.jpg'"
          >
        </div>
        <div class="search-item__description">
          <h2 class="search-item__title">
            ${removeParenthesis(title)}
          </h2>
          <div>
            <span class="search-item__authors">${authors[0]}</span>
            <span class="search-item__publisher">${publisher}</span>
          </div>
        </div>
      </li>
    `;
    })
    .join('');
};

SearchList.observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      SearchList.onIntersect();
    }
  },
  { threshold: 0.5 },
);

SearchList.onIntersect = function () {
  if (!this.state.isEndPage) {
    this.onNextPage({
      searchWord: this.state.searchWord,
      page: this.state.page + 1,
    });
  }
};

SearchList.setObserverTarget = function () {
  const nextTarget = this.element.querySelector('.search-item:last-child');
  if (nextTarget) {
    this.currentTarget && this.observer.unobserve(this.currentTarget);
    this.currentTarget = nextTarget;
    this.observer.observe(this.currentTarget);
  }
};

export default SearchList;
