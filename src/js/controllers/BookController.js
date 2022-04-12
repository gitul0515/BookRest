import BookPageView from "../views/BookPageView.js";
import BookListView from "../views/BookListView.js";
import BookModel from "../models/BookModel.js";

export default {
  init() {
    BookListView.setup(document.querySelector('.book-list'))
    this.fetchData();
  },

  async fetchData() {
    const data = await BookModel.list();
    BookListView.render(data);
  }
}
