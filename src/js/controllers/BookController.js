import BookView from "../views/BookView.js";
import BookListView from "../views/BookListView.js";
import BookModel from "../models/BookModel.js";

export default {
  init() {
    BookListView.setup(document.querySelector('.book-list'))


  },
}
