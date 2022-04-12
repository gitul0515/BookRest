import NavigationView from "../views/NavigationView.js";
import HomeView from "../views/HomeView.js";
import NoteView from "../views/NoteView.js";
import BookPageView from "../views/BookPageView.js";
import SettingView from "../views/SettingView.js";
import HomeController from "./HomeController.js";
import BookController from "./BookController.js";

const page = document.getElementById('page');
const navigation = document.getElementById('navigation');

export default {
  init() {
    HomeView.setup(page);
    NoteView.setup(page);
    BookPageView.setup(page);
    SettingView.setup(page);
    NavigationView.setup(navigation)
      .on('@click', e => this.onClick(e.detail.page))

    this.currentPage = '/';
    this.switchPage();
    window.addEventListener('popstate', () => this.onPopstate());
  },

  onClick(page) {
    this.currentPage = page;
    this.switchPage();
    history.pushState(null, null, this.currentPage);
  },

  switchPage() {
    switch (this.currentPage) {
      case '/':
        HomeView.render();
        HomeController.init();
        break;
      case '/note':
        NoteView.render();
        break;
      case '/book':
        BookPageView.render();
        BookController.init();
        break;
      case '/setting':
        SettingView.render();
        break;
      default:
        throw new Error('invalid page');
    }
  },

  onPopstate() {
    const { pathname } = location;
    this.currentPage = pathname;
    this.switchPage();
  }
}