export default {
  init(element) {
    if (!element) {
      throw new Error(`element가 존재하지 않습니다.`);
    }
    this.element = element;
    return this;
  },

  on(event, handler) {
    this.element.addEventListener(event, handler);
    return this;
  },

  dispatch(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    this.element.dispatchEvent(customEvent);
    return this;
  },

  createNode(string) {
    const template = document.createElement('template');
    template.innerHTML = string;
    return template.content;
  },

  replaceChildren(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    this.element.replaceChildren(template.content);
  },
};
