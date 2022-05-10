import View from './View.js';

const ModalView = Object.create(View);

ModalView.setup = function (element) {
  this.init(element);
  this.bindElement();
  this.bindEvent();
  return this;
};

ModalView.bindElement = function () {
  this.content = this.element.querySelector('.modal__content');
};

ModalView.bindEvent = function () {
  this.element.addEventListener('click', (e) => this.onClick(e));
};

ModalView.onClick = function ({ target }) {
  if (target.matches('#modal')) {
    this.hide();
    return;
  }
  if (target.matches('.modal__tab-item')) {
    this.dispatch('@click', { target });
    console.log(target);
    this.hide();
  }
};

ModalView.render = function (html) {
  if (!html) {
    throw new Error('html이 존재하지 않습니다.');
  }
  const node = this.createNode(html);
  this.content.replaceChildren(node);
  this.show();
};

ModalView.show = function () {
  this.element.classList.add('show');
  this.content.classList.add('show-up');
};

ModalView.hide = function () {
  this.element.classList.remove('show');
  this.content.classList.remove('show-up');
};

export default ModalView;
