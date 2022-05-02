import View from './View.js';

const NavigationView = Object.create(View);

NavigationView.setup = function (element) {
  this.init(element);
  this.render();
  this.bindEvent();
  return this;
};

NavigationView.render = function () {
  this.element.innerHTML = /* html */ 
  `
    <a href="/"><i class="fa-solid fa-plus"></i></a>
    <a href="/book"><i class="fa-solid fa-book-open-reader"></i></a>
    <a href="/note"><i class="fa-solid fa-pen-to-square"></i></a>
    <a href="/setting"><i class="fa-solid fa-square-poll-horizontal"></i></a
  `;
};

NavigationView.bindEvent = function () {
  this.element.addEventListener('click', (e) => this.onClick(e));
};

/* 
  a 태그를 클릭하면 페이지를 전환한다. 
  클릭 이벤트가 발생했음을 MainController에게 알린다.  
*/
NavigationView.onClick = function (e) {
  if (e.target.matches('#navigation > a')) {
    e.preventDefault();
    const page = e.target.getAttribute('href');
    this.dispatch('@click', { page });
  }
};

NavigationView.show = function () {
  this.element.classList.remove('hide');
};

NavigationView.hide = function () {
  this.element.classList.add('hide');
};

export default NavigationView;
