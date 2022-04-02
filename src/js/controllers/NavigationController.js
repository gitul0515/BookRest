import NavigationView from "../views/NavigationView.js";
import HomeView from "../views/HomeView.js";
import NoteView from "../views/NoteView.js";
import BookView from "../views/BookView.js";
import SettingView from "../views/SettingView.js";

const header = document.getElementById('header');
const content = document.getElementById('content');

export default {
  init() {
    NavigationView.setup(document.getElementById('navigation'))
      .on('@click', e => this.onClick(e.detail.page))

    this.currentPage = 'home';
    header.innerHTML = '<h1>어서오세요</h1>';
    content.innerHTML = '<p>홈입니다.</p>'
  },

  onClick(page) {
    if (page === 'home') {
      HomeView.render();
    } else if (page === 'note') {
      header.innerHTML = '<h1>note</h1>';
      content.innerHTML = '<p>노트를 읽으세요</p>'
    } else if (page === 'book') {
      header.innerHTML = '<h1>Book</h1>';
      content.innerHTML = '<p>책을 저장하세요</p>'
    } else if (page === 'setting') {
      header.innerHTML = '<h1>Setting</h1>';
      content.innerHTML = '<p>설정화면입니다</p>'
    }
  }
}