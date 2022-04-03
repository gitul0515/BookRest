import View from './View.js';

const NavigationView = Object.create(View);

NavigationView.setup = function(element) {
  this.init(element);
  this.bindEvent();
  return this;
}

NavigationView.bindEvent = function() {
  this.element.addEventListener('click', e => this.onClick(e));
};

/* 
  a 태그를 클릭하면 페이지를 전환한다. 
  클릭 이벤트가 발생했음을 MainController에게 알린다.  
*/
NavigationView.onClick = function(e) {
  if (!e.target.matches('#navigation > a')) {
    return;
  }
  e.preventDefault();
  const page = e.target.getAttribute('href').substr(1);
  this.emit('@click', { page });
};

export default NavigationView;
