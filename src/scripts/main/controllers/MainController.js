import NavigationView from '../views/NavigationView.js';
import HomePageView from '../views/HomePageView.js';
import HomeSearchPageView from '../views/HomeSearchPageView.js';
import NotePageView from '../views/NotePageView.js';
import BookPageView from '../views/BookPageView.js';
import SettingView from '../views/SettingView.js';

import HomeController from './HomeController.js';
import BookController from './BookController.js';
import NoteController from './NoteController.js';
import SettingController from './SettingController.js';

const page = document.getElementById('page');
const navigation = document.getElementById('navigation');

export default {
  init() {
    NavigationView.setup(navigation) //
      .on('@click', (e) => this.onClick(e.detail.page));

    window.addEventListener('popstate', () => this.route());
    this.route();
  },

  route() {
    const path = window.location.pathname;
    console.log(path);
    switch (path) {
      case '/':
      case '/home':
        HomePageView.setup(page);
        HomeController.init();
        break;
      case '/home/search':
        HomeSearchPageView.setup(page);
        console.log('me!', path);
        break;
      case '/book':
        BookPageView.setup(page);
        BookController.init();
        break;
      case '/note':
        NotePageView.setup(page);
        NoteController.init();
        break;
      case '/setting':
        SettingView.setup(page);
        SettingController.init();
        break;
      default:
        throw new Error('invalid page');
    }
  },

  onClick(page) {
    history.pushState(null, null, page);
    this.route();
  },
};
