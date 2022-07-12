import View from './View.js';

const FavoriteNotePage = Object.create(View);

FavoriteNotePage.setup = function (element) {
  this.init(element);
  return this;
};

FavoriteNotePage.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
};

FavoriteNotePage.getHtml = function () {
  return /* html */ `
    <header class="search-page__header">
      <button class="search-page__btn">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </header>
    <h1>좋아하는 노트</h1>
  `;
};

export default FavoriteNotePage;
