import HomePageView from '../views/homePage/index.js';
import HomeSearchPageView from '../views/homePage/HomeSearchPage.js';
import HomeController from './HomeController.js';
import BookPageView from '../views/bookPage/index.js';
import BookDetailPageView from '../views/bookPage/BookDetailPage.js';
import BookController from './BookController.js';
import NotePageView from '../views/notePage/index.js';
import NoteController from './NoteController.js';
import ModalController from './ModalController.js';
import NavigationView from '../views/navigation.js';
import BookModel from '../models/BookModel.js';

const page = document.getElementById('page');
const navigation = document.getElementById('navigation');

export default {
  init() {
    ModalController.init();
    NavigationView.setup(navigation).on('@click', (e) => this.onClick(e.detail.page));

    window.addEventListener('popstate', () => this.route());
    this.route();
  },

  route() {
    const path = window.location.pathname;
    console.log(path);

    if (path === '/' || path === '/home' || path === '/index.html') {
      HomePageView.setup(page);
      HomeController.init();
      NavigationView.show();
      return;
    }
    if (path === '/home/search') {
      HomeSearchPageView.render(page);
      NavigationView.hide();
      return;
    }
    if (path === '/book') {
      BookPageView.setup(page);
      BookController.init();
      NavigationView.show();
      return;
    }
    if (path.indexOf('/book/detail/') === 0) {
      const id = path.split('/')[3];
      const book = BookModel.getBook(id);
      BookDetailPageView.render(book);
      NavigationView.hide();
      return;
    }
    if (path === '/book/new-editor') {
      NavigationView.hide();
      return;
    }
    if (path === '/note') {
      NotePageView.setup(page);
      NoteController.init();
      NavigationView.show();
      return;
    }
  },

  onClick(page) {
    history.pushState(null, null, page);
    this.route();
  },
};
