import View from './View.js';

const SettingView = Object.create(View);

SettingView.setup = function(element) {
  this.init(element);
  this.bindEvent();
  return this;
};

SettingView.bindEvent = function() {

};

SettingView.render = function() {
  const html = this.getHeaderHtml() + this.getContentHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

SettingView.getHeaderHtml = function() {
  return `<header class="header">
    <h1 class="header__title">마이 페이지</h1>
    <h3 class="header__message">독서는 더 나은 나를 만드는 방법입니다.</h3>
  </header>`;
};

SettingView.getContentHtml = function() {
  return `<div class="content">
    <p>hello<p>
  </div>`;
};

SettingView.createElement = function(string) {
  const temp = document.createElement('template');
  temp.innerHTML = string;
  return temp.content;
}

export default SettingView;