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
      .on('@clickPrev', () => this.onclickPrev())
      .on('@search-api', (e) => this.onSearch(e.detail.word, e.detail.page))
      .on('@clickItem', (e) => this.onClickItem(e.detail.bookData));
  },

  onClickTab(path) {
    history.pushState(null, null, path);
    MainController.route();
  },

  onclickPrev() {
    history.pushState(null, null, '/home');
    MainController.route();
  },

  async onSearch(word, page) {
    const { documents, meta } = await fetchBookData(word, page);
    HomeSearchPageView.renderList(documents, meta);
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
  },
};
