import View from './View.js';

const HomeCalendarView = Object.create(View);

HomeCalendarView.setup = function(element) {

}

HomeCalendarView.getHtml = function() {
  return `<article class="home__tab home__tab--calendar">
    <div>
      <h2>독서 달력</h2>
      <h3>이번 달은 얼마나 읽었나요?</h3>
    </div>
    <i class="fa-solid fa-calendar-days"></i>
  </article>`;
}

export default HomeCalendarView;