export default {
  init(element) {
    if (!element) {
      throw new Error(`element가 존재하지 않습니다.`);
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

  replaceChildren(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    this.element.replaceChildren(template.content);
  }

  // createNode(string) {
  //   const template = document.createElement('template');
  //   template.innerHTML = string;
  //   return template.content;
  // },

  // show() {
  //   this.element.style.display = 'block';
  //   return this;
  // },

  // hide() {
  //   this.element.style.display = 'none';
  //   return this;
  // },
};
