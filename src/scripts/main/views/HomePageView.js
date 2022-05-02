import View from './View.js';

const HomePageView = Object.create(View);

HomePageView.setup = function (element) {
  this.init(element);
  this.render();
  this.bindElement();
  this.bindEvent();
};

HomePageView.render = function () {
  const html = this.getHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

HomePageView.getHtml = function () {
  return /* html */ `
    <header class="header">
      <h1 class="header__title">북레스트</h1>
      <h3 class="header__message">책과 함께 휴식을 취하세요 :)</h3>
    </header>
    <div class="content content--home">
      <a class="home__tab home__search-tab" href="/home/search">
        <h2>책을 추가해 보세요.</h2>
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
    <div id="modal">
      <div class="modal__content">hello</div>
    </div>
  `;
};

HomePageView.bindElement = function () {
  this.content = this.element.querySelector('.content');
};

HomePageView.bindEvent = function () {
  this.content.addEventListener('click', (e) => {
    const tab = e.target.closest('.home__tab');
    if (tab) {
      e.preventDefault();
      const path = tab.getAttribute('href');
      this.dispatch('@clickTab', { path });
    }
  });
};

export default HomePageView;
