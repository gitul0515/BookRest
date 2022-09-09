import NotePage from '../views/notePage/index.js';
import NoteList from '../views/notePage/NoteList.js';
import NoteEditPage from '../views/notePage/NoteEditPage.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInit = false;

export default {
  init() {
    NoteList.setup(document.querySelector('.note-list'));
    NoteEditPage.setup(page);

    !isInit && this.addCustomEvent();
    this.fetchNoteList();
  },

  // prettier-ignore
  addCustomEvent() {
    NotePage
      .on('@clickNoteTab', (e) => this.onTabClick(e.detail.path));
    isInit = true;
  },

  async fetchNoteList() {
    const data = await BookModel.getNoteList();
    NoteList.render(data);
  },

  onTabClick(path) {
    history.pushState(null, null, path);
    MainController.route();
  },

  removeNote(id) {
    BookModel.removeNote(id);
    const bookId = window.location.pathname.split('/')[3];
    if (bookId) {
      const book = BookModel.getBook(bookId);
      NoteList.render(book.notes);
    } else {
      const allNotes = BookModel.getNoteList();
      NoteList.render(allNotes);
    }
  },
};
