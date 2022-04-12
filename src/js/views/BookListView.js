import View from './View.js';

const BookListView = Object.create(View);

BookListView.setup = function(element) {
  this.init(element);
  console.log(this.element);
  return this;
}

BookListView.render = function(list) {
  if (!Array.isArray(list) || list.length === 0) {
    return;
  }
  const html = this.getHtml(list);
  const element = this.createElement(html);
  this.element.replaceChildren(element);
}

BookListView.getHtml = function(list) {
  return list.map(({title, rating, thumbnail}) => 
  `
    <li class="book-item">
      <div class="book-item__img" >
        <img src="${thumbnail}" alt="표지 이미지">
      </div>
      <ul class="book-item__rating">
        ${this.getRatingHtml(rating)}
      </ul>
      <h3 class="book-item__title">${title}</h3>
    </li> 
  `).join('');
}

BookListView.getRatingHtml = function(_rating) {
  const rating = parseInt(_rating, 10);
  console.log(rating);

  return `<li><i class="fa-solid fa-star"></i></li>
  <li><i class="fa-solid fa-star"></i></li>
  <li><i class="fa-solid fa-star"></i></li>
  <li><i class="fa-solid fa-star"></i></li>
  <li><i class="fa-solid fa-star"></i></li>`
}

export default BookListView;