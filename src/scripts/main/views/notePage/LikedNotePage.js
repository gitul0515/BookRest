import View from '../common.js';

const LikedNotePage = Object.create(View);

LikedNotePage.setup = function (element) {
  this.init(element);
  return this;
};

LikedNotePage.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
};

LikedNotePage.getHtml = function () {
  return /* html */ `
    <header class="search-page__header">
      <button class="search-page__btn">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </header>
    <h1>좋아하는 노트</h1>
  `;
};

export default LikedNotePage;
