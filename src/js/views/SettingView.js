import View from './View.js';

const SettingView = Object.create(View);

SettingView.setup = function(el) {
  this.init(el);
  this.bindEvents();
  return this;
}

SettingView.bindEvents = function() {

};

export default SettingView;