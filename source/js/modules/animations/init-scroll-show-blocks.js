import {ScrollTrigger} from '../../vendor/scroll-trigger';
import {animations} from './animation-data';

const initShowBlocksOnScroll = () => {
  const blocks = document.querySelectorAll('#show-on-scroll [data-animate]');

  const obj = [...blocks].reduce((acc, el) => {
    const key = el.dataset.animate;

    if (!(key in acc)) {
      acc[key] = [];
    }
    acc[key].push(el);
    return acc;
  }, {});

  Object.keys(obj).forEach((key) => {
    ScrollTrigger.batch(obj[key], {
      start: 'center center',
      onEnter: (batch) => {
        window.gsap.to(
            batch,
            Object.assign(animations[key].to, animations[key].setting)
        );
      },
    });
  });
};

export {initShowBlocksOnScroll};
