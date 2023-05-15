const scrollToHandler = (evt) => {
  evt.preventDefault();
  const btn = evt.target.closest('[data-move-to]');
  const target = document.querySelector(btn.dataset.moveTo);
  // eslint-disable-next-line no-undef
  gsap.to(window, 0.5, {
    scrollTo: {
      y: target,
    },
    ease: 'power.out',
  });
};

export const initScrollTo = () => {
  const scrollToButtons = document.querySelectorAll('[data-move-to]');

  scrollToButtons.forEach((btn) => {
    btn.addEventListener('click', scrollToHandler);
  });
};
