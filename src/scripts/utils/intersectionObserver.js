export const setupIntersectionObserver = (callback) => {
  const observerOption = {
    threshold: 0.5,
  };
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  }, observerOption);
};
