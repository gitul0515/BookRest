import Modal from '../views/modal.js';
import BookPresenter from './BookPresenter.js';
import NotePresenter from './NotePresenter.js';

const modal = document.getElementById('modal');

export default {
  init() {
    Modal.setup(modal)
      .on('@click', (e) => this.onClick(e.detail.target))
      .on('@submit', (e) => this.onSubmit(e.detail.value, e.detail.dataset));
  },

  onClick({ dataset }) {
    if ('sortBookBy' in dataset) {
      const { sortBookBy, title } = dataset;
      BookPresenter.sortBooks(sortBookBy, title);
      Modal.hide();
      return;
    }
    if ('bookOption' in dataset) {
      const { id, bookOption } = dataset;
      switch (bookOption) {
        case 'remove':
          BookPresenter.deleteBook(id);
          break;
        default:
          throw new Error('Invalid bookOption.');
      }
      return;
    }
    if ('noteOption' in dataset) {
      const { id, bookId, noteOption } = dataset;
      switch (noteOption) {
        case 'remove':
          NotePresenter.deleteNote(id, bookId);
          break;
        default:
          throw new Error('Invalid noteOption.');
      }
      return;
    }
  },
};
