import View from './View.js';

const BookView = Object.create(View);

BookView.setup = function(el) {
  this.init(el);
  this.bindEvents();
  return this;
}

BookView.bindEvents = function() {

};

export default BookView;