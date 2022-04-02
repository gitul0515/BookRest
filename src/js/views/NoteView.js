import View from './View.js';

const NoteView = Object.create(View);

NoteView.setup = function(el) {
  this.init(el);
  this.bindEvents();
  return this;
}

NoteView.bindEvents = function() {

};

export default NoteView;