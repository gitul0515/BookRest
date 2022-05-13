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

  addCustomEvent() {
    NoteListView.addEvent('@count', (e) => this.onCount(e.detail.id)) //
      .addEvent('@favorite', (e) => this.onFavorite(e.detail.id));
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteListView.render(data);
  },

  async onCount(id) {
    await BookModel.addReadCount(id);
  },

  async onFavorite(id) {
    const res = await BookModel.toggleFavorite(id);
    console.log(res);
  },
};
