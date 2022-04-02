import View from './View.js';

const NoteView = Object.create(View);

NoteView.setup = function(element) {
  this.init(element);
  this.bindEvents();
  return this;
}

NoteView.bindEvents = function() {

};

NoteView.render = function() {
  const html = this.getHeaderHtml() + this.getContentHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

NoteView.getHeaderHtml = function() {
  return `<header class="header">
    <h1 class="header__title">나의 노트</h1>
    <h3 class="header__message">176개의 노트를 작성하셨군요!</h3>
  </header>`;
};

NoteView.getContentHtml = function() {
  return `<div class="content">
    <p>hello<p>
  </div>`;
};

NoteView.createElement = function(string) {
  const temp = document.createElement('template');
  temp.innerHTML = string;
  return temp.content;
}

export default NoteView;