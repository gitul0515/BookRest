export const generateId = () => {
  return Math.floor(new Date().valueOf() * Math.random());
};
