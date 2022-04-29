import BookPageView from '../views/BookPageView.js';
import BookListView from '../views/BookListView.js';
import BookDetailPageView from '../views/BookDetailPageView.js';
import ModalView from '../views/ModalView.js';
import BookModel from '../models/BookModel.js';

const app = document.getElementById('app');
let initialize = false;

export default {
  init() {
    if (!initialize) {
      BookPageView.on('@search', (e) => this.onSearch(e.detail.value)) //
        .on('@sort', () => this.onSort())
        .on('@detailPage', (e) => this.onDetailPage(e.detail.id));
      BookListView.setup(document.querySelector('.book-list'));
      BookDetailPageView.setup(app);
      ModalView.setup(document.getElementById('modal')) //
        .on('@click', (e) => this.onModalClick(e.detail.target));
      this.fetchBookList();
      initialize = true;
    }
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
    console.log(id);
    history.pushState(null, null, `/book/${id}`);
  },

  async onModalClick(target) {
    const { sortBy } = target.dataset;
    const data = await BookModel.getSortedList(sortBy);
    BookListView.render(data);
    ModalView.hide();
  },
};
