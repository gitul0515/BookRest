import View from './View.js';

const HomeSearchPageView = Object.create(View);

HomeSearchPageView.setup = function (element) {
  this.init(element);
  return this;
};

HomeSearchPageView.render = function () {
  const html = this.getHtml();
  const node = this.createNode(html);
  this.element.replaceChildren(node);

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
      <form class="search-page__form" action="" method="get">
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
  const text = this.input.value;
  if (text.length > 1) {
    this.dispatch('@search-api', { text });
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

  const html = /* html */ `
      <ul class="search-list">
        ${this.bookData
          .map(({ title, authors, publisher, thumbnail }, index) => {
            return `<li class="search-item" data-index=${index}>
            <div class="search-item__thumbnail" >
              <img src=${thumbnail}>
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
  const node = this.createNode(html);
  this.div.replaceChildren(node);
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

export default HomeSearchPageView;
