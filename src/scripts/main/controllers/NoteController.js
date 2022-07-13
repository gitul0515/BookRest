import NotePageView from '../views/notePage/index.js';
import NoteListView from '../views/notePage/NoteList.js';
import NoteEditPageView from '../views/notePage/NoteEditPage.js';
import FavoriteNotePage from '../views/notePage/LikedNotePage.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInitialize = false;

export default {
  init() {
    NoteListView.setup(document.querySelector('.note-list'));
    NoteEditPageView.setup(page);
    FavoriteNotePage.setup(page);
    !isInitialize && this.addCustomEvent();
    this.fetchNoteList();
  },

  // prettier-ignore
  addCustomEvent() {
    NotePageView
      .on('@clickNoteTab', (e) => this.onClickTab(e.detail.path));
    NoteListView
      .on('@count', (e) => this.addReadCount(e.detail.id))
      .on('@favorite', (e) => this.toggleFavorite(e.detail.id));
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
