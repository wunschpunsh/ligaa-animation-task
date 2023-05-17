const animations = {
  fade: {
    to: {opacity: 1},
    setting: {stagger: 0.2, duration: 1, overwrite: true, autoAlpha: 1},
  },

  fadeIn: {
    to: {opacity: 1, y: 0},
    setting: {duration: 1, overwrite: true},
    autoAlpha: 1,
  },
  fadeScale: {
    to: {opacity: 1, scale: 1},
    setting: {
      duration: 1,
      overwrite: true,
      ease: 'back.out(1.5)',
      autoAlpha: 1,
    },
  },
};

export {animations};
