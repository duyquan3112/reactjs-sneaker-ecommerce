const ScrollUtil = {
  scrollToTop: (behavior = "smooth", delay = 150) => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: behavior,
      });
    }, delay);
  },

  scrollToPosition: (position, behavior = "smooth", delay = 150) => {
    setTimeout(() => {
      window.scrollTo({
        top: position,
        behavior: behavior,
      });
    }, delay);
  },
};

export default ScrollUtil;
