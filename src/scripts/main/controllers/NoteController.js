import NoteListView from '../views/NoteListView.js';
import BookModel from '../models/BookModel.js';

export default {
  init() {
    NoteListView.setup(document.querySelector('.note-list')) //
      .render();
    this.fetchNoteList();
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteListView.render(data);
  },
};
