export const addClass = (element, ...classNames) => {
  classNames.forEach((className) => {
    element.classList.add(className);
  });
};

export const removeClass = (element, ...classNames) => {
  classNames.forEach((className) => {
    element.classList.remove(className);
  });
};

export const toggleClass = (element, ...classNames) => {
  classNames.forEach((className) => {
    element.classList.toggle(className);
  });
};
