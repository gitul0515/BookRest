import NotePage from '../views/notePage/index.js';
import NoteList from '../views/notePage/NoteList.js';
import NoteEditPage from '../views/notePage/NoteEditPage.js';
import BookModel from '../models/BookModel.js';
import MainPresenter from './MainPresenter.js';
import { REGEXP } from '../../constants/regexp.js';

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
    MainPresenter.route();
  },

  deleteNote(id, bookId) {
    BookModel.deleteNote(id, bookId);
    const path = window.location.pathname;
    const isBookDetailPage = REGEXP.BOOK_DETAIL_PAGE.test(path);

    if (isBookDetailPage) {
      const book = BookModel.getBook(bookId);
      NoteList.render(book.notes);
    } else {
      const allNotes = BookModel.getNoteList();
      NoteList.render(allNotes);
    }
  },
};
