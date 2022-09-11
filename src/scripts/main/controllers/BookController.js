import BookPage from '../views/bookPage/index.js';
import BookList from '../views/bookPage/BookList.js';
import BookDetailPage from '../views/bookPage/BookDetailPage.js';
import NoteEditPage from '../views/notePage/NoteEditPage.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInit = false;

export default {
  init() {
    if (!isInit) {
      this.setupPage();
      this.addCustomEvent();
      isInit = true;
    }
    this.getBookList();
  },

  setupPage() {
    BookDetailPage.setup(page);
    NoteEditPage.setup(page);
  },

  // prettier-ignore
  addCustomEvent() {
    BookPage
      .on('@search', (e) => this.onSearch(e.detail.value))
      .on('@detailPage', (e) => this.onDetailPage(e.detail.id),
    );
    BookDetailPage
      .on('@prevClick', () => this.onPrevClick()) 
      .on('@addClick', (e) => this.onAddClick(e.detail.id));
    NoteEditPage
      .on('@escClick', () => this.onEscClick()) 
      .on('@saveClick', (e) => this.onSaveClick(e.detail.bookId, e.detail.newNote));
  },

  getBookList() {
    const data = BookModel.getAllBooks();
    BookList.render(data);
  },

  onSearch(query) {
    const data = BookModel.searchBooks(query);
    BookList.render(data);
  },

  async onDetailPage(id) {
    history.pushState(null, null, `/book/${id}/detail`);
    MainController.route();
  },

  onPrevClick() {
    history.pushState(null, null, '/book');
    MainController.route();
  },

  onAddClick(id) {
    history.pushState(null, null, `/book/${id}/edit`);
    MainController.route(id);
  },

  // FIXME: url 관련된 버그 (editor 페이지를 history에 남기지 말 것)
  onEscClick() {
    history.back();
  },

  onSaveClick(id, newNote) {
    BookModel.addNote(id, newNote);
    history.replaceState(null, null, `/book/${id}/detail`);
    MainController.route();
  },

  sortBooks(sortBy, title) {
    const data = BookModel.sortBooks(sortBy);
    BookList.render(data);
    BookPage.setSortButtonText(title);
  },

  deleteBook(id) {
    BookModel.deleteBook(id);
    history.replaceState(null, null, '/book');
    MainController.route();
  },
};
