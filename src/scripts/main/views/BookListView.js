import View from './View.js';

const BookListView = Object.create(View);

BookListView.setup = function (element) {
  this.init(element);
  return this;
};

BookListView.render = function (data) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }
  const html = this.getHtml(data);
  const node = this.createNode(html);
  this.element.replaceChildren(node);
};

BookListView.getHtml = function (data) {
  return data
    .map(
      ({ title, rating, thumbnail, id }) => /* html */ ` 
    <li class="book-item" data-id=${id}>
      <div class="book-item__img" >
        <img src="${thumbnail}" alt="표지 이미지">
      </div>
      <ul class="book-item__rating">
        ${this.getRatingHtml(rating)}
      </ul>
      <h3 class="book-item__title">${title}</h3>
    </li> 
  `,
    )
    .join('');
};

/* 평점(rating)에 따라 html을 다르게 생성한다.
 * 예1: 평점이 8인 경우, 노란색 별 아이콘 4개를 생성하고
 *     색깔 없는 별 아이콘 1개를 생성한다.
 * 예2: 평점이 5인 경우, 노란색 별 아이콘 2개를 생성하고
 *     반쪽 별 아이콘 1개를 생성하고, 색깔 없는 별 아이콘 2개를 생성한다.
 */
BookListView.getRatingHtml = function (_rating) {
  let html = '';
  const rating = parseInt(_rating, 10);
  if (rating % 2 === 0) {
    const starCount = rating / 2;
    for (let i = 0; i < starCount; i++) {
      html += '<li><i class="fa-solid fa-star"></i></li>';
    }
    for (let i = 0; i < 5 - starCount; i++) {
      html += '<li><i class="fa-regular fa-star"></i></li>';
    }
  } else {
    const starCount = Math.floor(rating / 2);
    for (let i = 0; i < starCount; i++) {
      html += '<li><i class="fa-solid fa-star"></i></li>';
    }
    html += '<li><i class="fa-solid fa-star-half-stroke"></i></li>';
    for (let i = 0; i < 4 - starCount; i++) {
      html += '<li><i class="fa-regular fa-star"></i></li>';
    }
  }
  return html;
};

export default BookListView;
