import View from './View.js';

const BookListView = Object.create(View);

BookListView.setup = function(element) {
  this.init(element);
  console.log(this.element);
  return this;
}

BookListView.render = function() {
  return `<ul class="book-list">
    <li class="book-item">
      <div class="book-item__img" >
        <img src="./asset/image/book/book-1.jpg" alt="표지 이미지">
      </div>
      <ul class="book-item__rating">
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
      </ul>
      <h3 class="book-item__title">딥 워크</h3>
    </li> 
  </ul>
  `
}

export default BookListView;