export const removeParenthesis = function (text) {
  const index = text.indexOf('(');
  return index === -1 ? text : text.slice(0, index);
};

export const removeSpace = function (text) {
  return text.replaceAll(' ', '');
};
