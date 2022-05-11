import ModalView from '../views/ModalView.js';
import BookListView from '../views/BookListView.js';
import BookModel from '../models/BookModel.js';

const modal = document.getElementById('modal');

export default {
  init() {
    ModalView.setup(modal) //
      .addEvent('@click', (e) => this.onClick(e.detail.target));
  },

  async onClick({ dataset }) {
    if ('sortBookBy' in dataset) {
      const { sortBookBy } = dataset;
      const data = await BookModel.getSortedList(sortBookBy);
      BookListView.render(data);
      ModalView.hide();
      return;
    }
  },
};
