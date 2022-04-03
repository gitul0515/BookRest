import View from './View.js';

const HomeSearchPageView = Object.create(View);

HomeSearchPageView.setup = function(element) {
  this.init(element);
  this.bindEvent();
  return this;
}

HomeSearchPageView.bindEvent = function() {
  this.element.addEventListener('click', () => this.hide());
}

HomeSearchPageView.render = function() {
  console.log('new page');
}

HomeSearchPageView.getHtml = function() {
  return `<div class="home__page home__page--search">
    hello
  </div>`;
}

export default HomeSearchPageView;
