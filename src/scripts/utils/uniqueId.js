export const generateId = () => {
  return String(Math.floor(new Date().valueOf() * Math.random()));
};
