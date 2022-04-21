import NotePageView from '../views/NotePageView.js';
import NoteListView from '../views/NoteListView.js';

export default {
  init() {
    NoteListView.setup(document.querySelector('.note__list'));
  },
};
