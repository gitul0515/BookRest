import HomePage from '../views/homePage/index.js';
import { searchBooks } from '../../apis/searchBooks/index.js';
import BookModel from '../models/BookModel.js';
import Modal from '../views/modal.js';

let isInit = false;

export default {
  init() {
    if (!isInit) {
      this.addEventHandler();
      isInit = true;
    }
  },

  // prettier-ignore
  addEventHandler() {
    HomePage
      .on('@search-book-api', (e) => this.handleSearch(e.detail))
      .on('@clickBook', (e) => this.handleClickBook(e.detail));
  },

  async handleSearch({ searchWord, page }) {
    const data = await searchBooks(searchWord, page);
    HomePage.setState({
      ...HomePage.state,
      searchWord,
      page,
      books: [...HomePage.state.books, ...data.documents],
      isEndPage: data.meta['is_end'],
    });
  },

  async handleClickBook({ clickedBook }) {
    try {
      await BookModel.addBook(clickedBook);
      Modal.render('alert', { message: '책을 서재에 저장했어요 🙌' });
    } catch (e) {
      if (e.message === 'DUPLICATE_ID') {
        Modal.render('alert', { message: '이미 등록한 책이네요 👀' });
      }
    }
  },
};
