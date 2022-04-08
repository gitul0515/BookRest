import View from './View.js';

const HomeSearchPageView = Object.create(View);

HomeSearchPageView.setup = function(element) {
  this.init(element);
  this.icon = this.element.querySelector('i');
  this.form = this.element.querySelector('form');
  this.input = this.element.querySelector('input');
  this.div = this.element.querySelector('.search-result');
  this.bindEvent();
  return this;
}

HomeSearchPageView.bindEvent = function() {
  this.icon.addEventListener('click', () => this.onPageHide());
  this.form.addEventListener('submit', e => this.onSubmit(e));
}

HomeSearchPageView.onPageHide = function() {
  this.hide();
  this.div.innerHTML = '';
}

HomeSearchPageView.getHtml = function() {
  return `<div class="home__page home__page--search">
      <button><i class="fa-solid fa-arrow-left"></i></button>
      <h1>책을 찾아보세요!</h1>
      <form class="search-form" action="" method="get">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input 
          type="text" 
          placeholder="검색할 책을 입력해주세요."
          autofocus
        >
    </form>
    <div class="search-result"></div>
  </div>`;
}

HomeSearchPageView.render = function(data) {
  console.log(data);

  if (data.length === 0) {
    this.div.innerHTML = `
    <p>
      결과가 없어요.<br>
      다시 한 번 검색해 보시겠어요?
    </p>`;
    return;
  }

  const html = `
    <ul>
      ${data.map(({ title, authors, publisher, thumbnail }) => {
        return `<li class="search-result__item">
          <div class="search-result__thumbnail" >
            <img src=${thumbnail}>
          </div>
          <div class="search-result__description">
            <h2 class="search-result__title">
              ${title.indexOf('(') === -1 ? title : title.slice(0, title.indexOf('('))}
            </h2>
            <div>
              <span class="search-result__authors">${authors[0]}</span>
              <span class="search-result__publisher">${publisher}</span>
            </div>
          </div>
        <li/>`
      }).join('')}
    </ul>
  `

  const element = this.createElement(html);
  this.div.replaceChildren(element);
}


HomeSearchPageView.onSubmit = function(e) {
  e.preventDefault();
  const text = this.input.value;
  if (text.length > 1) {
    this.emit('@submit', { text });
    this.form.reset();
  }
}

HomeSearchPageView.createElement = function(string) {
  const temp = document.createElement('template');
  temp.innerHTML = string;
  return temp.content;
}

export default HomeSearchPageView;
