import HomePageView from '../views/HomePageView.js';
import HomeSearchPageView from '../views/HomeSearchPageView.js';
import ModalView from '../views/ModalView.js';
import { fetchBookData } from '../../service/api-search.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');

export default {
  init() {
    HomePageView.on('@clickTab', (e) => this.onClickTab(e.detail.path));

    HomeSearchPageView.setup(page) //
      .on('@backToHome', () => this.onBackToHome());

    // HomeSearchPageView.on('@backToHome', () => this.onBackToHome());

    // HomeSearchPageView.setup(document.querySelector('.home__search-page--list'))
    //   .on('@submit', (e) => this.onSearch(e.detail.text))
    //   .on('@click', (e) => this.onClickItem(e.detail.bookData));

    ModalView.setup(document.getElementById('modal')).on('@click', (e) =>
      this.onModalClick(e.detail.target),
    );
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
    HomeSearchPageView.render(data.documents);
  },

  async onClickItem(newItem) {
    const result = await BookModel.add(newItem);
    console.log(result);
  },

  onModalClick(target) {
    console.log(target);
  },
};
