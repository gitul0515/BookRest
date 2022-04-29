import View from './View.js';

const HomeSearchPageView = Object.create(View);

HomeSearchPageView.setup = function (element) {
  this.init(element);
  return this;
};

HomeSearchPageView.render = function () {
  const html = this.getHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);

  this.bindElement();
  this.bindEvent();
};

HomeSearchPageView.getHtml = function () {
  return `
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
  this.emit('@backToHome');
};

HomeSearchPageView.onSubmit = function (e) {
  e.preventDefault();
  const text = this.input.value;
  if (text.length > 1) {
    this.emit('@search', { text });
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

  const html = `
      <ul class="search-list">
        ${this.bookData
          .map(({ title, authors, publisher, thumbnail }, index) => {
            return `<li class="search-item" data-index=${index}>
            <div class="search-item__thumbnail" >
              <img src=${thumbnail}>
            </div>
            <div class="search-item__description">
              <h2 class="search-item__title">
                ${title.indexOf('(') === -1 ? title : title.slice(0, title.indexOf('('))}
              </h2>
              <div>
                <span class="search-item__authors">${authors[0]}</span>
                <span class="search-item__publisher">${publisher}</span>
              </div>
            </div>
          <li/>`;
          })
          .join('')}
      </ul>
    `;
  const element = this.createElement(html);
  this.div.replaceChildren(element);
};

HomeSearchPageView.onClick = function (e) {
  e.preventDefault();
  const li = e.target.closest('.search-item');
  if (li) {
    const index = parseInt(li.dataset.index, 10);
    const bookData = this.bookData[index];
    this.emit('@clickItem', { bookData });
  }
};

export default HomeSearchPageView;
