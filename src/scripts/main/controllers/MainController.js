import HomePageView from '../views/HomePageView.js';
import HomeSearchPageView from '../views/HomeSearchPageView.js';
import HomeController from './HomeController.js';
import BookPageView from '../views/BookPageView.js';
import BookDetailPageView from '../views/BookDetailPageView.js';
import BookController from './BookController.js';
import NotePageView from '../views/NotePageView.js';
import NoteController from './NoteController.js';
import SettingView from '../views/SettingView.js';
import SettingController from './SettingController.js';
import ModalController from './ModalController.js';
import NavigationView from '../views/NavigationView.js';
import BookModel from '../models/BookModel.js';

const page = document.getElementById('page');
const navigation = document.getElementById('navigation');

let numberOfBooks = BookModel.totalNumberOfBooks;
let numberOfNotes = BookModel.totalNumberOfNotes;

export default {
  init() {
    ModalController.init();
    NavigationView.setup(navigation) //
      .on('@click', (e) => this.onClick(e.detail.page));

    window.addEventListener('popstate', () => this.route());
    this.route();
  },

  route() {
    const path = window.location.pathname;

    if (path === '/' || path === '/home') {
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
      BookPageView.setup(page, numberOfBooks);
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
      NotePageView.setup(page, numberOfNotes);
      NoteController.init();
      return;
    }
    if (path === '/setting') {
      SettingView.setup(page);
      SettingController.init();
      return;
    }
    throw new Error('invalid page');
  },

  onClick(page) {
    history.pushState(null, null, page);
    this.route();
  },

  setNumberOfBooks(number) {
    numberOfBooks += number;
  },

  setNumberOfNotes(number) {
    numberOfNotes += number;
  },
};
