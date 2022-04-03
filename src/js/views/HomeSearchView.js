import View from './View.js';

const HomeSearchView = Object.create(View);

HomeSearchView.setup = function(element) {

}

HomeSearchView.getHtml = function() {
  return `<article class="home__tab home__tab--search">
    <h2>책을 추가해 보세요.</h2>
    <h3>읽고 있는 책이 있나요?</h3>
  </article>`;
}

export default HomeSearchView;
