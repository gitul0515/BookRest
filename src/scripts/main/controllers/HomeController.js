import HomePageView from '../views/HomePageView.js';
import HomeSearchPageView from '../views/HomeSearchPageView.js';
import { fetchBookData } from '../../service/api-search.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let initialize = false;

export default {
  init() {
    if (!initialize) {
      HomePageView.on('@clickTab', (e) => this.onClickTab(e.detail.path));
      HomeSearchPageView.setup(page) //
        .on('@backToHome', () => this.onBackToHome())
        .on('@search', (e) => this.onSearch(e.detail.text))
        .on('@clickItem', (e) => this.onClickItem(e.detail.bookData));
      initialize = true;
    }
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
    console.log('click!');
    const result = await BookModel.add(newItem);
  },
};
