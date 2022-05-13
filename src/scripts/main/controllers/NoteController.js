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
    NoteListView.addEvent('@count', (e) => this.onClickCount(e.detail.id));
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteListView.render(data);
  },

  async onClickCount(id) {
    const res = await BookModel.addReadCount(id);
    console.log(res);
  },
};
