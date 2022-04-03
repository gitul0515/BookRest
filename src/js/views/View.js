export default {
  init(element) {
    if (!element) {
      throw element;
    }
    this.element = element;
    return this;
  },

  on(event, handler) {
    this.element.addEventListener(event, handler);
    return this;
  },

  emit(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    this.element.dispatchEvent(customEvent);
    return this;
  },

  hide() {
    this.element.style.visibility = 'hidden';
    return this;
  },

  show() {
    this.element.style.visibility = 'visible';
    return this;
  }
}