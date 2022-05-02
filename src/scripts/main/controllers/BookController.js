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
    !isInitialize && this.addCustomEvent();
    this.fetchBookList();
  },

  addCustomEvent() {
    BookPageView.addEvent('@search', (e) => this.onSearch(e.detail.value)) //
      .addEvent('@sort', () => this.onSort())
      .addEvent('@detailPage', (e) => this.onDetailPage(e.detail.id));
    BookDetailPageView.addEvent('@prevClick', () => this.onPrevClick());
    ModalView.addEvent('@click', (e) => this.onModalClick(e.detail.target));
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

  async onDetailPage(id) {
    const data = await BookModel.getBook(id);
    console.log(data);
    BookDetailPageView.render(data);
    history.pushState(data, null, `/book/${id}`);
    MainController.route();
  },

  onPrevClick() {
    history.pushState(null, null, '/book');
    MainController.route();
  },

  async onModalClick(target) {
    const { sortBy } = target.dataset;
    const data = await BookModel.getSortedList(sortBy);
    BookListView.render(data);
    ModalView.hide();
  },
};
