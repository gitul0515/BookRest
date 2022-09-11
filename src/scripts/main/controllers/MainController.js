import HomePage from '../views/homePage/index.js';
import HomeController from './HomeController.js';
import BookPage from '../views/bookPage/index.js';
import BookDetailPage from '../views/bookPage/BookDetailPage.js';
import BookController from './BookController.js';
import NotePage from '../views/notePage/index.js';
import NoteEditPage from '../views/notePage/NoteEditPage.js';
import NoteController from './NoteController.js';
import Navigation from '../views/navigation.js';
import ModalController from './ModalController.js';
import BookModel from '../models/BookModel.js';
import { REGEXP } from '../../constants/regexp.js';

const page = document.getElementById('page');
const navigation = document.getElementById('navigation');

export default {
  init() {
    ModalController.init();
    Navigation.setup(navigation).on('@click', (e) => this.onClick(e.detail.path));

    window.addEventListener('popstate', () => this.route());
    this.route();
  },

  route() {
    const path = window.location.pathname;

    if (path === '/') {
      HomePage.setup(page);
      HomeController.init();
    }
    if (path === '/book') {
      BookPage.setup(page);
      BookController.init();
    }
    if (path === '/note') {
      NotePage.setup(page);
      NoteController.init();
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
