import NavigationView from "../views/NavigationView.js";
import HomeView from "../views/HomeView.js";
import NoteView from "../views/NoteView.js";
import BookView from "../views/BookView.js";
import SettingView from "../views/SettingView.js";
import HomeController from "./HomeController.js";

const page = document.getElementById('page');
const navigation = document.getElementById('navigation');

export default {
  init() {
    HomeView.setup(page);
    NoteView.setup(page);
    BookView.setup(page);
    SettingView.setup(page);
    NavigationView.setup(navigation)
      .on('@click', e => this.onClick(e.detail.page))

    this.currentPage = 'home';
    this.switchPage();
  },

  onClick(page) {
    this.currentPage = page;
    this.switchPage();
  },

  switchPage() {
    switch (this.currentPage) {
      case 'home':
        HomeView.render();
        HomeController.init();
        break;
      case 'note':
        NoteView.render();
        break;
      case 'book':
        BookView.render();
        break;
      case 'setting':
        SettingView.render();
        break;
      default:
        throw new Error('invalid page');
    }
  }
}