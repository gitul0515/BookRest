import View from './View.js';
import { addClass, removeClass } from '../../utils/className.js';

const NavigationView = Object.create(View);

NavigationView.setup = function (element) {
  this.init(element);
  this.render();
  this.setEvent();
  this.currentTab = this.element.firstElementChild;
  return this;
};

NavigationView.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
};

NavigationView.getHtml = function () {
  return /* html */ `
    <a class="navigation__tab-link active" href="/">
      <i class="navigation__tab-icon fa-solid fa-house"></i>
    </a>
    <a class="navigation__tab-link" href="/book">
      <i class="navigation__tab-icon fa-solid fa-book-open-reader"></i>
    </a>
    <a class="navigation__tab-link" href="/note">
      <i class="navigation__tab-icon fa-solid fa-pen-to-square"></i>
    </a>
    <a class="navigation__tab-link" href="/setting">
      <i class="navigation__tab-icon fa-solid fa-square-poll-horizontal"></i>
    </a>
  `;
};

NavigationView.setEvent = function () {
  this.element.addEventListener('click', (e) => this.onClick(e));
};

/* 
  a 태그를 클릭하면 페이지를 전환한다. 
  클릭 이벤트가 발생했음을 MainController에게 알린다.  
*/
NavigationView.onClick = function (e) {
  if (e.target.matches('.navigation__tab-link')) {
    e.preventDefault();
    const page = e.target.getAttribute('href');
    this.dispatch('@click', { page });
    this.setTabStyle(e.target);
  }
};

NavigationView.setTabStyle = function (nextTab) {
  removeClass(this.currentTab, 'active');
  this.currentTab = nextTab;
  addClass(this.currentTab, 'active');
};

NavigationView.show = function () {
  this.element.classList.remove('hide');
};

NavigationView.hide = function () {
  this.element.classList.add('hide');
};

export default NavigationView;
