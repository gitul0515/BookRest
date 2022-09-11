import HomePage from '../views/homePage/index.js';
import HomeSearchPage from '../views/homePage/HomeSearchPage.js';
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

const page = document.getElementById('page');
const navigation = document.getElementById('navigation');

export default {
  init() {
    ModalController.init();
    Navigation.setup(navigation).on('@click', (e) => this.onClick(e.detail.page));

    window.addEventListener('popstate', () => this.route());
    this.route();
  },

  route() {
    const path = window.location.pathname;

    if (['/', '/home'].includes(path)) {
      HomePage.setup(page);
      HomeController.init();
      Navigation.show();
      return;
    }
    if (path === '/home/search') {
      HomeSearchPage.render(page);
      Navigation.hide();
      return;
    }
    if (path === '/book') {
      BookPage.setup(page);
      BookController.init();
      Navigation.show();
      return;
    }
    if (path.indexOf('/book/detail/') === 0) {
      const id = path.split('/')[3];
      const book = BookModel.getBook(id);
      BookDetailPage.render(book);
      Navigation.hide();
      return;
    }
    if (path.indexOf('/book/') === 0) {
      const id = path.split('/')[2];
      NoteEditPage.render(id);
      Navigation.hide();
      return;
    }
    if (path === '/note') {
      NotePage.setup(page);
      NoteController.init();
      Navigation.show();
      return;
    }
  },

  onClick(page) {
    history.pushState(null, null, page);
    this.route();
  },
};
