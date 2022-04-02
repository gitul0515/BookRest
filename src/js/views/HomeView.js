import View from './View.js';

const HomeView = Object.create(View);

HomeView.setup = function(el) {
  this.init(el);
  this.bindEvents();
  return this;
}

HomeView.bindEvents = function() {

};

HomeView.render = function() {
  header.innerHTML = '<h1>어서오세요</h1>';
  content.innerHTML = '<p>홈입니다.</p>';
}

export default HomeView;
