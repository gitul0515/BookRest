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
      .on('@count', (e) => this.addReadCount(e.detail.id))
      .on('@favorite', (e) => this.toggleFavorite(e.detail.id));
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteListView.render(data);
  },

  async addReadCount(id) {
    const newNotes = await BookModel.addReadCount(id);
    NoteListView.render(newNotes);
  },

  async toggleFavorite(id) {
    await BookModel.toggleFavorite(id);
  },

  async initReadCount(id) {
    const newNotes = await BookModel.initReadCount(id);
    NoteListView.render(newNotes);
  },

  async removeNote(id) {
    const newNotes = await BookModel.removeNote(id);
    NoteListView.render(newNotes);
  },
};
