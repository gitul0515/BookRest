export default {
  init(element) {
    if (!element) {
      throw element;
    }
    this.element = element;
    return this;
  },

  addEvent(event, handler) {
    this.element.addEventListener(event, handler);
    return this;
  },

  dispatch(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    this.element.dispatchEvent(customEvent);
    return this;
  },

  show() {
    this.element.style.display = 'block';
    return this;
  },

  hide() {
    this.element.style.display = 'none';
    return this;
  },

  createElement(string) {
    const temp = document.createElement('template');
    temp.innerHTML = string;
    return temp.content;
  },
};
