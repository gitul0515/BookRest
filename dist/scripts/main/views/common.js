"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  init: function init(element) {
    if (!element) {
      throw new Error("element\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    }

    this.element = element;
    return this;
  },
  on: function on(event, handler) {
    this.element.addEventListener(event, handler);
    return this;
  },
  dispatch: function dispatch(event, data) {
    var customEvent = new CustomEvent(event, {
      detail: data
    });
    this.element.dispatchEvent(customEvent);
    return this;
  },
  createNode: function createNode(string) {
    var template = document.createElement('template');
    template.innerHTML = string;
    return template.content;
  },
  replaceChildren: function replaceChildren(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    this.element.replaceChildren(template.content);
  }
};
exports["default"] = _default;