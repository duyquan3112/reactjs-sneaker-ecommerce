const scrollToTop = (behavior = "smooth") => {
  window.scrollTo({
    top: 0,
    behavior: behavior,
  });
};

const scrollToPosition = (position, behavior = "smooth") => {
  window.scrollTo({
    top: position,
    behavior: behavior,
  });
};

export { scrollToTop, scrollToPosition };
