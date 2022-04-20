import NavigationView from '../views/NavigationView.js';
import HomePageView from '../views/HomePageView.js';
import NotePageView from '../views/NotePageView.js';
import BookPageView from '../views/BookPageView.js';
import SettingView from '../views/SettingView.js';
import HomeController from './HomeController.js';
import BookController from './BookController.js';
import NoteController from './NoteController.js';
import SettingController from './SettingController.js';

const app = document.getElementById('app');
const navigation = document.getElementById('navigation');

export default {
  init() {
    this.currentPage = '/note';
    this.switchPage();
    window.addEventListener('popstate', () => this.onPopstate());

    NavigationView.setup(navigation).on('@click', (e) =>
      this.onClick(e.detail.page)
    );
  },

  onClick(page) {
    this.currentPage = page;
    this.switchPage();
    history.pushState(null, null, this.currentPage);
  },

  switchPage() {
    switch (this.currentPage) {
      case '/':
        HomePageView.setup(app);
        HomeController.init();
        break;
      case '/book':
        BookPageView.setup(app);
        BookController.init();
        break;
      case '/note':
        NotePageView.setup(app);
        NoteController.init();
        break;
      case '/setting':
        SettingView.setup(app);
        SettingController.init();
        break;
      default:
        throw new Error('invalid page');
    }
  },

  onPopstate() {
    const { pathname } = location;
    this.currentPage = pathname;
    this.switchPage();
  },
};
