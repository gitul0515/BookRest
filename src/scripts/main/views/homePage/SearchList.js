import View from '../common.js';
import { removeParenthesis, removeSpace } from '/src/scripts/utils/format.js';

const SearchList = Object.create(View);

SearchList.setup = function (element, setSearchList) {
  this.init(element);
  this.setSearchList = setSearchList;
  this.initState();
  this.setEvent();
};

SearchList.initState = function () {
  this.state = {
    searchWord: '',
    books: [],
    page: 1,
    isEndPage: false,
    observerTarget: null,
  };
};

SearchList.setState = function (nextState) {
  if (this.state !== nextState) {
    this.state = nextState;
  }
};

SearchList.setEvent = function () {
  this.element.addEventListener('click', (e) => this.onClickBook(e));
};

SearchList.render = function (searchWord, { documents: books, meta }) {
  if (!books?.length) {
    this.element.innerHTML = this.getNoResultHtml();
    this.initState();
    return;
  }

  const node = this.createNode(this.getListHtml(books));
  this.element.appendChild(node);

  this.setState({
    ...this.state,
    searchWord,
    books: [...this.state.books, ...books],
    isEndPage: meta['is_end'],
  });

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

SearchList.onClickBook = function (e) {
  const li = e.target.closest('.search-item');
  if (li) {
    const { id } = li.dataset;
    const clickedBook = this.state.books.find(({ isbn }) => removeSpace(isbn) === id);
    // this.dispatch('@clickItem', { bookData });
    console.log(clickedBook);
  }
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
    this.setState({
      ...this.state,
      page: this.state.page + 1,
    });

    this.setSearchList({
      searchWord: this.state.searchWord,
      page: this.state.page,
    });
  }
};

SearchList.setObserverTarget = function () {
  const { observerTarget } = this.state;
  const nextTarget = this.element.querySelector('.search-item:last-child');
  if (nextTarget) {
    observerTarget && this.observer.unobserve(observerTarget);
    this.setState({
      ...this.state,
      observerTarget: nextTarget,
    });
    this.observer.observe(this.state.observerTarget);
  }
};

export default SearchList;
