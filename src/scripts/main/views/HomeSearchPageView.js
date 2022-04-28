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
      <form class="search-page__form" action="" method="get">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
        class="search-page__input"
        type="text"
        placeholder="검색할 책을 입력해주세요."
        autofocus
        >
      </form>
      <h1 class="search-page__title">책을 찾아보세요!</h1>
    </div>
    <div class="search-page__list"></div>
  `;
};

HomeSearchPageView.bindElement = function () {
  this.btn = this.element.querySelector('.search-page__btn');

  // this.form = this.element.querySelector('form');
  // this.input = this.element.querySelector('input');
  // this.div = this.element.querySelector('.search-result');
};

HomeSearchPageView.bindEvent = function () {
  this.btn.addEventListener('click', () => this.onPrevClick());

  // this.form.addEventListener('submit', (e) => this.onSubmit(e));
  // this.div.addEventListener('click', (e) => this.onClick(e));
};

HomeSearchPageView.onPrevClick = function () {
  this.emit('@backToHome');
};

// HomeSearchPageView.onPageHide = function () {
//   this.hide();
//   this.div.innerHTML = '';
// };

// HomeSearchPageView.render = function (data) {
//   this.bookData = data;

//   if (!this.bookData) {
//     return;
//   }

//   if (this.bookData.length === 0) {
//     this.div.innerHTML = `
//     <p>
//       결과가 없어요.<br>
//       다시 한 번 검색해 보시겠어요?
//     </p>`;
//     return;
//   }

//   const html = `
//     <ul>
//       ${this.bookData
//         .map(({ title, authors, publisher, thumbnail }, index) => {
//           return `<li class="search-result__item" data-index=${index}>
//           <div class="search-result__thumbnail" >
//             <img src=${thumbnail}>
//           </div>
//           <div class="search-result__description">
//             <h2 class="search-result__title">
//               ${title.indexOf('(') === -1 ? title : title.slice(0, title.indexOf('('))}
//             </h2>
//             <div>
//               <span class="search-result__authors">${authors[0]}</span>
//               <span class="search-result__publisher">${publisher}</span>
//             </div>
//           </div>
//         <li/>`;
//         })
//         .join('')}
//     </ul>
//   `;
//   const element = this.createElement(html);
//   this.div.replaceChildren(element);
// };

// HomeSearchPageView.onClick = function (e) {
//   const li = e.target.closest('.search-result__item');
//   if (li) {
//     const index = parseInt(li.dataset.index, 10);
//     const bookData = this.bookData[index];
//     this.emit('@click', { bookData });
//   }
// };

// HomeSearchPageView.onSubmit = function (e) {
//   e.preventDefault();
//   const text = this.input.value;
//   if (text.length > 1) {
//     this.emit('@submit', { text });
//     this.form.reset();
//   }
// };

export default HomeSearchPageView;
