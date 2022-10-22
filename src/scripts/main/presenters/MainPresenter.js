import HomePage from '../views/homePage/index.js';
import HomePresenter from './HomePresenter.js';
import BookPage from '../views/bookPage/index.js';
import BookDetailPage from '../views/bookPage/BookDetailPage.js';
import BookPresenter from './BookPresenter.js';
import NotePage from '../views/notePage/index.js';
import NoteEditPage from '../views/notePage/NoteEditPage.js';
import NotePresenter from './NotePresenter.js';
import Navigation from '../views/navigation.js';
import ModalPresenter from './ModalPresenter.js';
import BookModel from '../models/BookModel.js';
import { REGEXP } from '../../constants/regexp.js';

const page = document.getElementById('page');
const navigation = document.getElementById('navigation');

export default {
  init() {
    ModalPresenter.init();
    Navigation.setup(navigation).on('@click', (e) => this.onClick(e.detail.path));

    window.addEventListener('popstate', () => this.route());
    this.route();
  },

  route() {
    const path = window.location.pathname;

    if (path === '/' || path === '/index.html') {
      HomePage.setup(page);
      HomePresenter.init();
    }
    if (path === '/book') {
      BookPage.setup(page);
      BookPresenter.init();
    }
    if (path === '/note') {
      NotePage.setup(page);
      NotePresenter.init();
    }
    if (REGEXP.BOOK_DETAIL_PAGE.test(path)) {
      const id = path.split('/')[2];
      const book = BookModel.getBook(id);
      BookDetailPage.render(book);
    }
    if (REGEXP.BOOK_EDIT_PAGE.test(path)) {
      const id = path.split('/')[2];
      NoteEditPage.render(id);
    }
    Navigation.setState(path);
  },

  onClick(path) {
    history.pushState(null, null, path);
    this.route();
  },
};
