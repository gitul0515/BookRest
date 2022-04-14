import BookPageView from "../views/BookPageView.js";
import BookListView from "../views/BookListView.js";
import BookModel from "../models/BookModel.js";

export default {
  init() {
    BookPageView
      .on('@search', e => this.onSearch(e.detail.value))
    BookListView
      .setup(document.querySelector('.book-list'));
    this.fetchBookList();
  },

  async fetchBookList() {
    const data = await BookModel.list();
    BookListView.render(data);
  },

  async onSearch(value) {
    const data = await BookModel.search(value);
    BookListView.render(data);
  }
}
