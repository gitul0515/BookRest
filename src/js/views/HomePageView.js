import View from './View.js';
import HomeSearchTabView from './HomeSearchTabView.js';
import HomeSearchListView from './HomeSearchListView.js';
import HomeSearchSaveView from './HomeSearchSaveView.js';
import HomeCalendarTabView from './HomeCalendarTabView.js';


const HomePageView = Object.create(View);

HomePageView.setup = function(element) {
  this.init(element);
  this.render();
}

HomePageView.render = function() {
  const html = this.getHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

HomePageView.getHtml = function() {
  return `
    <header class="header">
      <h1 class="header__title">북레스트</h1>
      <h3 class="header__message">책과 함께 휴식을 취하세요 :)</h3>
    </header>
    <div class="content content--home">
      ${HomeSearchTabView.getHtml()}
      ${HomeSearchListView.getHtml()}
      ${HomeCalendarTabView.getHtml()}
    </div>
  `;
};

export default HomePageView;
