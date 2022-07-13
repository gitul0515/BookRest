import HomePage from '../views/homePage/index.js';
import SearchList from '../views/homePage/SearchList.js';
import { searchBooks } from '../../apis/searchBooks/index.js';
import BookModel from '../models/BookModel.js';
import ModalView from '../views/modal.js';

const page = document.getElementById('page');
let isInit = false;

export default {
  init() {
    if (!isInit) {
      this.addEvent();
      isInit = true;
    }
  },

  // prettier-ignore
  addEvent() {
    HomePage
      .on('@search-book-api', (e) => this.onSearch(e.detail))
      .on('@clickItem', (e) => this.onClickItem(e.detail.bookData));
  },

  async onSearch(payload) {
    console.log(payload);
    const data = await searchBooks(payload.searchWord, payload.page);
    SearchList.render(payload.searchWord, data);
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
