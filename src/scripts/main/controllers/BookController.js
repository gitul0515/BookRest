import BookPageView from '../views/BookPageView.js';
import BookListView from '../views/BookListView.js';
import BookDetailPageView from '../views/BookDetailPageView.js';
import NoteEditPageView from '../views/NoteEditPageView.js';
import BookModel from '../models/BookModel.js';
import MainController from './MainController.js';

const page = document.getElementById('page');
let isInit = false;

export default {
  init() {
    if (!isInit) {
      this.setupView();
      this.addCustomEvent();
      isInit = true;
    }
    this.fetchBookList();
  },

  setupView() {
    BookDetailPageView.setup(page);
    NoteEditPageView.setup(page);
  },

  // prettier-ignore
  addCustomEvent() {
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
    MainController.setNumberOfNotes(+1);
  },

  async sortBook(by) {
    const data = await BookModel.getSortedList(by);
    BookListView.render(data);
  },
};
