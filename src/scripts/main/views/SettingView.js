import View from './View.js';

const SettingView = Object.create(View);

SettingView.setup = function (element) {
  this.init(element);
  this.render();
};

SettingView.render = function () {
  const html = this.getHtml();
  const node = this.createNode(html);
  this.element.replaceChildren(node);
};

SettingView.getHtml = function () {
  return /* html */ `
    <header class="header">
      <h1 class="header__title">마이 페이지</h1>
      <h3 class="header__message">독서는 더 나은 나를 만드는 방법입니다.</h3>
    </header>
    <div class="content"></div>
  `;
};

export default SettingView;
