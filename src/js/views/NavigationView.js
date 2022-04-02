import View from './View.js';

const NavigationView = Object.create(View);

NavigationView.setup = function(el) {
  this.init(el);
  this.bindEvents();
  return this;
}

NavigationView.bindEvents = function() {
  this.el.addEventListener('click', e => this.onClick(e));
};

NavigationView.onClick = function(e) {
  if (!e.target.matches('#navigation > a')) {
    return;
  }
  e.preventDefault();
  /* 클릭 시 스타일 변경 */

  /* 해당 tab이 클릭되었음을 MainController에게 알린다. */
  const page = e.target.getAttribute('href').substr(1);
  this.emit('@click', { page });
};

export default NavigationView;
