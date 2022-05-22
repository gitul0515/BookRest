export const throttle = (callback, delay) => {
  let timerId;
  return () => {
    if (timerId) {
      return;
    }
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, delay);
  };
};
