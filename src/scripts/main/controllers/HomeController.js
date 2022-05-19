import HomePageView from '../views/HomePageView.js';
import HomeSearchPageView from '../views/HomeSearchPageView.js';
import { fetchBookData } from '../../service/api-search.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInit = false;

export default {
  init() {
    if (!isInit) {
      this.setupInnerPage();
      this.addCustomEvent();
      isInit = true;
    }
  },

  setupInnerPage() {
    HomeSearchPageView.setup(page);
  },

  // prettier-ignore
  addCustomEvent() {
    HomePageView
      .on('@clickTab', (e) => this.onClickTab(e.detail.path));
    HomeSearchPageView
      .on('@backToHome', () => this.onBackToHome())
      .on('@search-api', (e) => this.onSearch(e.detail.text))
      .on('@clickItem', (e) => this.onClickItem(e.detail.bookData));
  },

  onClickTab(path) {
    history.pushState(null, null, path);
    MainController.route();
  },

  onBackToHome() {
    history.pushState(null, null, '/home');
    MainController.route();
  },

  async onSearch(query) {
    const data = await fetchBookData(query);
    HomeSearchPageView.renderList(data.documents);
  },

  async onClickItem(newItem) {
    await BookModel.addBook(newItem);
    MainController.setNumberOfBooks(+1);
  },
};
