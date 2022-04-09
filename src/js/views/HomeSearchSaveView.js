import View from './View.js';
import HomeSearchListView from './HomeSearchListView.js';

const HomeSearchSaveView = Object.create(View);

HomeSearchSaveView.setup = function(element) {
  this.init(element);
  this.bindEvent();
  return this;
}

HomeSearchSaveView.bindEvent = function() {

}

HomeSearchSaveView.getHtml = function() {
  return `<div class="home__search-page--save">
    <h1>hello</h1>
  </div>
  `
}

HomeSearchSaveView.show = function() {
  this.element.style.visibility = 'visible';
  HomeSearchListView.onPageHide();
  return this;
}

HomeSearchSaveView.onHide = function() {

}

export default HomeSearchSaveView;
