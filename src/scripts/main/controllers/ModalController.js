import Modal from '../views/modal.js';
import BookController from './BookController.js';
import NoteController from './NoteController.js';

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
      BookController.sortBooks(sortBookBy, title);
      Modal.hide();
      return;
    }
    if ('noteOption' in dataset) {
      const { id, noteOption } = dataset;
      switch (noteOption) {
        case 'init':
          NoteController.initReadCount(id);
          break;
        case 'remove':
          NoteController.removeNote(id);
          break;
        default:
          throw new Error('Invalid noteOption.');
      }
    }
  },

  onSubmit(value, dataset) {
    console.log(value, dataset);
  },
};
