import View from '../common.js';
import BookModel from '../../models/BookModel.js';

const NotePage = Object.create(View);

NotePage.setup = function (element) {
  this.init(element);
  this.render();
};

NotePage.render = function () {
  const html = this.getHtml();
  this.replaceChildren(html);
};

NotePage.getHtml = function () {
  return /* html */ `
    <header class="header">
      <h1 class="header__title">나의 노트</h1>
      <h3 class="header__message">${BookModel.getNumberOfNotes()}개의 노트를 작성하셨군요!</h3>
    </header>
    <div class="content content--note">
      <ul class="note-list"></ul>
    </div>
  `;
};

export default NotePage;
