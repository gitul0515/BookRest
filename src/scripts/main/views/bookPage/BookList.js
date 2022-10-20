import View from '../common.js';

const BookList = Object.create(View);

BookList.setup = function (element) {
  this.init(element);
  return this;
};

BookList.render = function (data) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }
  const html = this.getHtml(data);
  this.replaceChildren(html);
};

BookList.getHtml = function (data) {
  return data
    .map(
      ({ title, thumbnail, id }) => /* html */ ` 
    <li class="book-item" data-id=${id}>
      <div class="book-item__img" >
        <img src="${thumbnail}" alt="책 표지 이미지" onerror="this.src='/src/asset/image/book/book-no.jpg'">
      </div>
      <h3 class="book-item__title">${title}</h3>
    </li> 
  `,
    )
    .join('');
};

export default BookList;
