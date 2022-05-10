import BookPageView from '../views/BookPageView.js';
import BookListView from '../views/BookListView.js';
import BookDetailPageView from '../views/BookDetailPageView.js';
import NoteEditPageView from '../views/NoteEditPageView.js';
import ModalView from '../views/ModalView.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInitialize = false;

export default {
  init() {
    BookListView.setup(document.querySelector('.book-list'));
    BookDetailPageView.setup(page);
    NoteEditPageView.setup(page);
    ModalView.setup(document.getElementById('modal'));

    !isInitialize && this.addCustomEvent();
    this.fetchBookList();
  },

  addCustomEvent() {
    BookPageView.addEvent('@search', (e) => this.onSearch(e.detail.value)) //
      .addEvent('@sort', () => this.onSort())
      .addEvent('@detailPage', (e) => this.onDetailPage(e.detail.id));
    BookDetailPageView.addEvent('@prevClick', () => this.onPrevClick()) //
      .addEvent('@addClick', (e) => this.onAddClick(e.detail.id));
    NoteEditPageView.addEvent('@escClick', () => this.onEscClick()) //
      .addEvent('@saveClick', (e) => this.onSaveClick(e.detail.bookId, e.detail.newNote));
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
    const book = await BookModel.getBook(id);
    BookDetailPageView.render(book);
    history.pushState(book, null, `/book/detail/${id}`);
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

  async onSaveClick(id, newNote) {
    await BookModel.addNote(id, newNote);
    const book = await BookModel.getBook(id);
    BookDetailPageView.render(book);
    history.replaceState(book, null, `/book/detail/${id}`);
    MainController.route();
  },

  async onModalClick(target) {
    const { sortBy } = target.dataset;
    const data = await BookModel.getSortedList(sortBy);
    BookListView.render(data);
    ModalView.hide();
  },
};
