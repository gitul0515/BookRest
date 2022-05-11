import NoteListView from '../views/NoteListView.js';
import NoteEditPageView from '../views/NoteEditPageView.js';
import BookModel from '../models/BookModel.js';

const page = document.getElementById('page');

export default {
  init() {
    NoteListView.setup(document.querySelector('.note-list')).render();
    this.fetchNoteList();

    NoteEditPageView.setup(page);
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteListView.render(data);
  },
};
