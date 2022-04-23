import View from './View.js';
import HomeSearchListView from './HomeSearchListView.js';

const HomeSearchSaveView = Object.create(View);

HomeSearchSaveView.setup = function(element) {
  this.init(element);
  this.backButton = this.element.querySelector('.back-button');
  this.bindEvent();
  return this;
}

HomeSearchSaveView.bindEvent = function() {
  this.backButton.addEventListener('click', () => this.onHide());
}

HomeSearchSaveView.getHtml = function(data) {
  if (!data) {
    return;
  }
  return `<div class="home__search-page--save">
    <header>
      <button class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
    </header>
    <div class="search-page--save__container">
      <h1>책 등록하기</h1>
      <div id="book-thumbnail">
        <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F521598%3Ftimestamp%3D20220410171336">
      </div>
      <form class="search-page--save__form">
        <label for="book-title">책 제목</label>
        <input type="text" value="사피엔스" id="book-title">
        <label for="book-author">저자</label>
        <input type="text" value="유발 하라리" id="book-author">
        <label for="book-publisher">출판사</label>
        <input type="text" value="김영사" id="book-publisher">
        <label for="book-totalpage">전체 페이지 수</label>
        <input type="text" value="248" id="book-totalpage">
        <button><i class="fa-solid fa-check"></i>저장하기</button>
      </form>
    </div>
  </div>
  `
}

HomeSearchSaveView.onShow = function(data) {
  this.show();
  HomeSearchListView.onPageHide();
  HomeSearchSaveView.getHtml(data);
  return this;
}

HomeSearchSaveView.onHide = function() {
  this.hide();
}

export default HomeSearchSaveView;
