import NotePage from '../views/notePage/index.js';
import NoteList from '../views/notePage/NoteList.js';
import NoteEditPage from '../views/notePage/NoteEditPage.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInitialize = false;

export default {
  init() {
    NoteList.setup(document.querySelector('.note-list'));
    NoteEditPage.setup(page);

    !isInitialize && this.addCustomEvent();
    this.fetchNoteList();
  },

  // prettier-ignore
  addCustomEvent() {
    NotePage
      .on('@clickNoteTab', (e) => this.onClickTab(e.detail.path));
    NoteList
      .on('@count', (e) => this.addReadCount(e.detail.id))
    isInitialize = true;
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteList.render(data);
  },

  onClickTab(path) {
    history.pushState(null, null, path);
    MainController.route();
  },

  async removeNote(id) {
    const newNotes = await BookModel.removeNote(id);
    NoteList.render(newNotes);
  },
};
