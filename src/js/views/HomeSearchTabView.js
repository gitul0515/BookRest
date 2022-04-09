import View from './View.js';

const HomeSearchTabView = Object.create(View);

HomeSearchTabView.setup = function(element) {
  this.init(element);
  this.bindEvent();
  return this;
}

HomeSearchTabView.bindEvent = function() {
  this.element.addEventListener('click', () => this.onClick());
}

// 클릭 이벤트가 발생했음을 HomeController에게 알린다.  
HomeSearchTabView.onClick = function() {
  this.emit('@click');
}

HomeSearchTabView.getHtml = function() {
  return `<div class="home__tab home__search-tab">
    <h2>책을 추가해 보세요.</h2>
    <h3>읽고 있는 책이 있나요?</h3>
  </div>`;
}

export default HomeSearchTabView;
