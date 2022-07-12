import View from './View.js';
import { addClass, removeClass } from '../../utils/className.js';

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
  // this.element.addEventListener('submit', (e) => this.onSubmit(e));
};

ModalView.onClick = function ({ target }) {
  if (target.matches('#modal')) {
    this.hide();
    return;
  }
  if (target.matches('.modal__tab-item')) {
    this.dispatch('@click', { target });
    this.hide();
  }
};

ModalView.render = function (type, content) {
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

ModalView.getListHtml = function (content) {
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

ModalView.getAlertHtml = function (content) {
  return `<h2 class="modal__message">${content.message}</h2>`;
};

ModalView.setStyle = function (type) {
  removeClass(this.content, this.type);
  this.type = type;
  addClass(this.content, this.type);
};

ModalView.show = function () {
  addClass(this.element, 'show');
  addClass(this.content, 'show-up');
};

ModalView.hide = function () {
  removeClass(this.element, 'show');
  removeClass(this.content, 'show-up');
};

export default ModalView;

// ModalView.getFormHtml = function (content) {
//   const { id, title, key, placeholder, buttonIcon } = content;
//   return /* html */ `
//   <h2 class="modal__title">${title}</h2>
//   <form class="modal__form" data-id=${id} data-key=${key}>
//     <input class="modal__input" placeholder="${placeholder}" />
//     <button class="modal__btn">
//       <i class="modal__icon--btn ${buttonIcon}"></i>
//     </button>
//   </form>
// `;
// };

// ModalView.createNode = function (string) {
//   const template = document.createElement('template');
//   template.innerHTML = string;
//   return template.content;
// };

// ModalView.onSubmit = function (e) {
//   e.preventDefault();
//   const input = this.element.querySelector('.modal__input');
//   const { value } = input;
//   if (value.length > 1) {
//     const { dataset } = e.target;
//     this.dispatch('@submit', { value, dataset });
//     this.hide();
//   } else {
//     alert('두 글자 이상 입력하세요.');
//   }
// };
