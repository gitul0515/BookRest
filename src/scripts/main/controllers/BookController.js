import BookPageView from '../views/bookPage/index.js';
import BookListView from '../views/bookPage/BookList.js';
import BookDetailPageView from '../views/bookPage/BookDetailPage.js';
import NoteEditPageView from '../views/notePage/NoteEditPage.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInit = false;

export default {
  init() {
    if (!isInit) {
      this.setupPage();
      this.addEvent();
      isInit = true;
    }
    this.getBooks();
  },

  setupPage() {
    BookDetailPageView.setup(page);
    NoteEditPageView.setup(page);
  },

  // prettier-ignore
  addEvent() {
    BookPageView
      .on('@search', (e) => this.onSearch(e.detail.value))
      .on('@detailPage', (e) => this.onDetailPage(e.detail.id),
    );
    BookDetailPageView
      .on('@prevClick', () => this.onPrevClick()) 
      .on('@addClick', (e) => this.onAddClick(e.detail.id));
    NoteEditPageView
      .on('@escClick', () => this.onEscClick()) 
      .on('@saveClick', (e) => this.onSaveClick(e.detail.bookId, e.detail.newNote));
  },

  getBooks() {
    const data = BookModel.getBooks();
    BookListView.render(data);
  },

  onSearch(query) {
    const data = BookModel.searchBooks(query);
    BookListView.render(data);
  },

  async onDetailPage(id) {
    history.pushState(null, null, `/book/detail/${id}`);
    MainController.route();
  },

  onPrevClick() {
    history.pushState(null, null, '/book');
    MainController.route();
  },

  onAddClick(id) {
    NoteEditPageView.render(id);
    history.pushState(null, null, '/book/new-editor');
    MainController.route();
  },

  // FIXME: url 관련된 버그 (editor 페이지를 history에 남기지 말 것)
  onEscClick() {
    history.back();
  },

  onSaveClick(id, newNote) {
    BookModel.addNote(id, newNote);
    history.replaceState(null, null, `/book/detail/${id}`);
    MainController.route();
  },

  sortBooks(sortBy, title) {
    const data = BookModel.sortBooks(sortBy);
    BookListView.render(data);
    BookPageView.setSortButtonText(title);
  },
};
