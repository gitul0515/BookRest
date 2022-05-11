import BookPageView from '../views/BookPageView.js';
import BookListView from '../views/BookListView.js';
import BookDetailPageView from '../views/BookDetailPageView.js';
import NoteEditPageView from '../views/NoteEditPageView.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInitialize = false;

export default {
  init() {
    BookListView.setup(document.querySelector('.book-list'));
    BookDetailPageView.setup(page);
    NoteEditPageView.setup(page);

    !isInitialize && this.addCustomEvent();
    this.fetchBookList();
  },

  addCustomEvent() {
    BookPageView.addEvent('@search', (e) => this.onSearch(e.detail.value)) //
      .addEvent('@detailPage', (e) => this.onDetailPage(e.detail.id));
    BookDetailPageView.addEvent('@prevClick', () => this.onPrevClick()) //
      .addEvent('@addClick', (e) => this.onAddClick(e.detail.id));
    NoteEditPageView.addEvent('@escClick', () => this.onEscClick()) //
      .addEvent('@saveClick', (e) => this.onSaveClick(e.detail.bookId, e.detail.newNote));
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
};
