import ModalView from '../views/ModalView.js';
import BookController from './BookController.js';

const modal = document.getElementById('modal');

export default {
  init() {
    ModalView.setup(modal) //
      .addEvent('@click', (e) => this.onClick(e.detail.target))
      .addEvent('@submit', (e) => this.onSubmit(e.detail.value, e.detail.dataset));
  },

  onClick({ dataset }) {
    if ('sortBookBy' in dataset) {
      const by = dataset.sortBookBy;
      BookController.sortBook(by);
      ModalView.hide();
      return;
    }
  },

  onSubmit(value, dataset) {
    console.log(value, dataset);
  },
};
