import View from './View.js';

const NoteView = Object.create(View);

NoteView.setup = function(element) {
  this.init(element);
  this.render();
}

NoteView.render = function() {
  const html = this.getHtml();
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

NoteView.getHtml = function() {
  return `
    <header class="header">
      <h1 class="header__title">나의 노트</h1>
      <h3 class="header__message">176개의 노트를 작성하셨군요!</h3>
    </header>
    <div class="content"></div>
  `;
};

export default NoteView;