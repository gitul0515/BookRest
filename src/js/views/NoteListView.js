import View from './View.js';

const NoteListView = Object.create(View);

NoteListView.setup = function (element) {
  this.init(element);
  console.log('noteList', this.element);
  return this;
};

NoteListView.render = function (data) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }
  const html = this.getHtml(data);
  const element = this.createElement(html);
  this.element.replaceChildren(element);
};

NoteListView.getHtml = function (data) {};

export default NoteListView;
