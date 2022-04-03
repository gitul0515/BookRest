import View from '../src/js/views/View.js';

const HomeStatisticsView = Object.create(View);

HomeStatisticsView.setup = function(element) {

}

HomeStatisticsView.getHtml = function() {
  return `<article class="search-tab">
    <h2>책을 추가해 보세요.</h2>
    <h3>읽고 있는 책이 있나요?</h3>
  </article>`;
}

export default HomeStatisticsView;