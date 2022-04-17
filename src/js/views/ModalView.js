import View from "./View.js";

const ModalView = Object.create(View);

ModalView.setup = function(element) {
  this.init(element);
  this.bindElement();
  this.bindEvent();
}

ModalView.bindElement = function() {
  this.content = this.element.querySelector('.modal__content');
}

ModalView.bindEvent = function() {
  this.element.addEventListener('click', e => this.onClick(e));
}

ModalView.onClick = function({ target }) {
  if (target.matches('#modal')) {
    this.hide();
    return;
  }
  // ModalView.emit('@click', { target })
}

ModalView.show = function() {
  this.element.classList.add('show');
  this.content.classList.add('show-up');
}

ModalView.hide = function() {
  this.element.classList.remove('show');
  this.content.classList.remove('show-up');
}

export default ModalView;