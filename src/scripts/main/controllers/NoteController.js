import NoteListView from '../views/NoteListView.js';
import NoteEditPageView from '../views/NoteEditPageView.js';
import BookModel from '../models/BookModel.js';

const page = document.getElementById('page');
let isInitialize = false;

export default {
  init() {
    NoteListView.setup(document.querySelector('.note-list')).render();
    NoteEditPageView.setup(page);

    !isInitialize && this.addCustomEvent();
    this.fetchNoteList();
  },

  // prettier-ignore
  addCustomEvent() {
    NoteListView
      .on('@count', (e) => this.onCount(e.detail.id))
      .on('@favorite', (e) => this.onFavorite(e.detail.id));
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteListView.render(data);
  },

  async onCount(id) {
    const newNotes = NoteListView.notes.map((note) => {
      if (note.id === id) {
        note.readCount += 1;
      }
      return note;
    });
    NoteListView.render(newNotes);
    await BookModel.addReadCount(id);
  },

  async onFavorite(id) {
    await BookModel.toggleFavorite(id);
  },

  async initReadCount(id) {
    const newNotes = NoteListView.notes.map((note) => {
      if (note.id === id) {
        note.readCount = 0;
      }
      return note;
    });
    NoteListView.render(newNotes);
    await BookModel.initReadCount(id);
  },

  async removeNote(id) {
    const newNotes = NoteListView.notes.filter((note) => note.id !== id);
    NoteListView.render(newNotes);
    await BookModel.removeNote(id);
  },
};
