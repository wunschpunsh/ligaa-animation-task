const animations = {
  fade: {
    to: {opacity: 1},
    setting: {stagger: 0.2, duration: 1, overwrite: true},
  },

  fadeIn: {
    to: {opacity: 1, y: 0},
    setting: {duration: 1, overwrite: true},
  },
  fadeScale: {
    to: {opacity: 1, scale: 1},
    setting: {duration: 1, overwrite: true, ease: 'back'},
  },
};

export {animations};
