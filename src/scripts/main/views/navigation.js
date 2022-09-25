import View from './common.js';
import { addClass, removeClass } from '../../utils/className.js';

const MAIN_PATHS = ['/', '/book', '/note'];
const Navigation = Object.create(View);

Navigation.setup = function (element) {
  this.init(element);
  this.render();
  this.setEvent();
  this.initState();
  return this;
};

Navigation.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
};

Navigation.getHtml = function () {
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
  `;
};

Navigation.setEvent = function () {
  this.element.addEventListener('click', (e) => this.onClick(e));
};

Navigation.onClick = function (e) {
  if (e.target.matches('.navigation__tab-link')) {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    this.dispatch('@click', { path }); // MainController에서 처리
  }
};

Navigation.initState = function () {
  this.state = {
    tabs: [...this.element.children],
    previousTab: this.element.firstElementChild,
    currentTab: this.element.firstElementChild,
  };
};

Navigation.setState = function (path) {
  path = path === '/index.html' ? '/' : path;
  if (!MAIN_PATHS.includes(path)) {
    Navigation.hide();
    return;
  }
  Navigation.show();
  const index = MAIN_PATHS.indexOf(path);
  this.state.currentTab = this.state.tabs[index];
  this.setTabStyle();
  this.state.previousTab = this.state.currentTab;
};

Navigation.setTabStyle = function () {
  removeClass(this.state.previousTab, 'active');
  addClass(this.state.currentTab, 'active');
};

Navigation.show = function () {
  this.element.classList.remove('hide');
};

Navigation.hide = function () {
  this.element.classList.add('hide');
};

export default Navigation;
