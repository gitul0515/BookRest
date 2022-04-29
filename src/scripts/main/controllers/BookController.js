import BookPageView from '../views/BookPageView.js';
import BookListView from '../views/BookListView.js';
import BookDetailPageView from '../views/BookDetailPageView.js';
import ModalView from '../views/ModalView.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInitialize = false;

export default {
  init() {
    BookDetailPageView.setup(page);
    ModalView.setup(document.getElementById('modal'));
    BookListView.setup(document.querySelector('.book-list'));
    !isInitialize && this.addCustomEventListener();
    this.fetchBookList();
  },

  addCustomEventListener() {
    BookPageView.on('@search', (e) => this.onSearch(e.detail.value)) //
      .on('@sort', () => this.onSort())
      .on('@detailPage', (e) => this.onDetailPage(e.detail.id));
    ModalView.on('@click', (e) => this.onModalClick(e.detail.target));
    isInitialize = true;
  },

  async fetchBookList() {
    const data = await BookModel.list();
    BookListView.render(data);
  },

  async onSearch(value) {
    const data = await BookModel.search(value);
    BookListView.render(data);
  },

  onSort() {
    ModalView.show();
  },

  onDetailPage(id) {
    history.pushState(null, null, `/book/${id}`);
    MainController.route();
  },

  async onModalClick(target) {
    const { sortBy } = target.dataset;
    const data = await BookModel.getSortedList(sortBy);
    BookListView.render(data);
    ModalView.hide();
  },
};
