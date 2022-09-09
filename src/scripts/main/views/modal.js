import View from './common.js';
import { addClass, removeClass } from '../../utils/className.js';

const Modal = Object.create(View);

Modal.setup = function (element) {
  this.init(element);
  this.bindElement();
  this.bindEvent();
  return this;
};

Modal.bindElement = function () {
  this.content = this.element.querySelector('.modal__content');
};

Modal.bindEvent = function () {
  this.element.addEventListener('click', (e) => this.onClick(e));
};

Modal.onClick = function ({ target }) {
  if (target.matches('#modal')) {
    this.hide();
    return;
  }
  if (target.matches('.modal__tab-item')) {
    this.dispatch('@click', { target });
    this.hide();
  }
};

Modal.render = function (type, content) {
  let html;
  if (type.indexOf('list') >= 0) {
    html = this.getListHtml(content);
  }
  if (type === 'alert') {
    html = this.getAlertHtml(content);
  }
  this.content.innerHTML = html;
  this.setStyle(type);
  this.show();
};

Modal.getListHtml = function (content) {
  const { id, title, key, items } = content;
  return /* html */ `
    <h2 class="modal__title">${title}</h2>
    <ul class="modal__tab-list">
      ${items
        .map(
          ({ title, value, icon }) => `
        <li class="modal__tab-item" data-id=${id} data-${key}="${value}" data-title="${title}">
          ${icon ? `<i class="modal__icon ${icon}"></i>` : ``}
          ${title}
        </li>
      `,
        )
        .join('')}
    </ul>
  `;
};

Modal.getAlertHtml = function (content) {
  return `<p class="modal__message">${content.message}</p>`;
};

Modal.setStyle = function (type) {
  removeClass(this.content, this.type);
  this.type = type;
  addClass(this.content, this.type);
};

Modal.show = function () {
  addClass(this.element, 'show');
  addClass(this.content, 'show-up');
};

Modal.hide = function () {
  removeClass(this.element, 'show');
  removeClass(this.content, 'show-up');
};

export default Modal;
