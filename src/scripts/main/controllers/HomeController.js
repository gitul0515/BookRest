import HomePageView from '../views/HomePageView.js';
import HomeSearchPageView from '../views/HomeSearchPageView.js';
import { fetchBookData } from '../../service/api-search.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInitialize = false;

export default {
  init() {
    HomeSearchPageView.setup(page);
    !isInitialize && this.addCustomeEvent();
  },

  addCustomeEvent() {
    HomePageView.addEvent('@clickTab', (e) => this.onClickTab(e.detail.path));
    HomeSearchPageView.addEvent('@backToHome', () => this.onBackToHome()) 
      .addEvent('@search-api', (e) => this.onSearch(e.detail.text))
      .addEvent('@clickItem', (e) => this.onClickItem(e.detail.bookData));
    isInitialize = true;
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
