import ModalView from '../views/ModalView.js';
import BookController from './BookController.js';
import NoteController from './NoteController.js';

const modal = document.getElementById('modal');

export default {
  init() {
    ModalView.setup(modal)
      .on('@click', (e) => this.onClick(e.detail.target))
      .on('@submit', (e) => this.onSubmit(e.detail.value, e.detail.dataset));
  },

  onClick({ dataset }) {
    console.log(dataset);
    if ('sortBookBy' in dataset) {
      const by = dataset.sortBookBy;
      BookController.sortBook(by);
      ModalView.hide();
      return;
    }
    if ('noteOption' in dataset) {
      const { id, noteOption } = dataset;
      switch (noteOption) {
        case 'init': // 노트 읽은 횟수 초기화
          NoteController.initReadCount(id);
          break;
        case 'remove': // 노트 삭제
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
