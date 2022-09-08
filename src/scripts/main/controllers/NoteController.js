import NotePageView from '../views/notePage/index.js';
import NoteListView from '../views/notePage/NoteList.js';
import NoteEditPageView from '../views/notePage/NoteEditPage.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInitialize = false;

export default {
  init() {
    NoteListView.setup(document.querySelector('.note-list'));
    NoteEditPageView.setup(page);
    !isInitialize && this.addCustomEvent();
    this.fetchNoteList();
  },

  // prettier-ignore
  addCustomEvent() {
    NotePageView
      .on('@clickNoteTab', (e) => this.onClickTab(e.detail.path));
    NoteListView
      .on('@count', (e) => this.addReadCount(e.detail.id))
    isInitialize = true;
  },

  onClickTab(path) {
    history.pushState(null, null, path);
    MainController.route();
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteListView.render(data);
  },

  async removeNote(id) {
    const newNotes = await BookModel.removeNote(id);
    NoteListView.render(newNotes);
  },
};
