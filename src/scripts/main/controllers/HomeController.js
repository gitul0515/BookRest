import HomePageView from '../views/HomePageView.js';
import HomeSearchPageView from '../views/HomeSearchPageView.js';
import { fetchBookData } from '../../service/api-search.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';
import ModalView from '../views/ModalView.js';

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
    try {
      await BookModel.addBook(newItem);
      ModalView.render('alert', { message: '책을 서재에 저장했어요 🙌' });
    } catch (e) {
      if (e.message === 'DUPLICATE_ID') {
        ModalView.render('alert', { message: '이미 등록한 책이네요 👀' });
      }
    }
    MainController.setNumberOfBooks(+1);
  },
};
