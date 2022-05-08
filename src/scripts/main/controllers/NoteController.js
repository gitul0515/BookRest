import NoteListView from '../views/NoteListView.js';
import NoteEditorPageView from '../views/NoteEditorPageView.js';
import BookModel from '../models/BookModel.js';

const page = document.getElementById('page');

export default {
  init() {
    NoteListView.setup(document.querySelector('.note-list')).render();
    this.fetchNoteList();

    NoteEditorPageView.setup(page);
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteListView.render(data);
  },
};
