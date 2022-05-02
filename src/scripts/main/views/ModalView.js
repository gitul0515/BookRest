import View from './View.js';

const ModalView = Object.create(View);

ModalView.setup = function (element) {
  this.init(element);
  this.bindElement();
  this.renderContent();
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
  }
};

ModalView.renderContent = function (html) {
  if (!html) {
    html = this.getContentHtml();
  }
  const element = this.createElement(html);
  this.content.replaceChildren(element);
};

ModalView.getContentHtml = function () {
  return /* html */ `
    <h2 class="modal__title">정렬 방법을 선택해주세요</h2>
    <ul class="modal__tab-list">
      <li class="modal__tab-item" data-sort-by="new">최근에 읽은 책부터</li>
      <li class="modal__tab-item" data-sort-by="old">먼저 읽은 책부터</li>
      <li class="modal__tab-item" data-sort-by="title">제목 순서로</li>
      <li class="modal__tab-item" data-sort-by="title-reverse">제목 역순으로</li>
      <li class="modal__tab-item" data-sort-by="high-rating">높은 별점부터</li>
      <li class="modal__tab-item" data-sort-by="low-rating">낮은 별점부터</li>
    </ul>
  `;
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
