import View from './View.js';

const HomePageView = Object.create(View);

HomePageView.setup = function (element) {
  this.init(element);
  this.render();
  this.bindElement();
  this.setEvent();
};

HomePageView.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
};

HomePageView.getHtml = function () {
  return /* html */ `
    <header class="header">
      <h1 class="header__title">북레스트</h1>
      <h3 class="header__message">책과 함께 휴식을 취하세요 :)</h3>
    </header>
    <div class="home__tabs">
      <a class="home__tab home__tab--search" href="/home/search">
        <h2>책을 검색해 보세요.</h2>
        <h3>읽고 있는 책이 있나요?</h3>
      </a>
      <a class="home__tab home__tab--calendar" href="/home/calendar">
        <div>
          <h2>독서 달력</h2>
          <h3>이번 달은 얼마나 읽었나요?</h3>
        </div>
        <i class="fa-solid fa-calendar-days"></i>
      </a>
    </div>
  `;
};

HomePageView.bindElement = function () {
  this.tabs = this.element.querySelector('.home__tabs');
};

HomePageView.setEvent = function () {
  this.tabs.addEventListener('click', (e) => this.onClickTab(e));
};

HomePageView.onClickTab = function (e) {
  const tab = e.target.closest('.home__tab');
  if (tab) {
    e.preventDefault();
    const path = tab.getAttribute('href');
    this.dispatch('@clickTab', { path });
  }
};

export default HomePageView;
