import {ScrollTrigger} from '../../vendor/scroll-trigger';

const initFadeScale = () => {
  const fadeScaleBlocks = document.querySelectorAll(
      '[data-parallax="fadeScale"]'
  );

  window.gsap.set(fadeScaleBlocks, {
    opacity: 0,
    scale: 0.7,
  });

  const tl = window.gsap.timeline();

  tl.to(fadeScaleBlocks, {
    opacity: 1,
    scale: 1,
  });

  ScrollTrigger.create({
    animation: tl,
    scrub: true,
    trigger: fadeScaleBlocks,
    start: 'top bottom',
    end: 'bottom top',
  });
};

const initTransformY = () => {
  const transformYBlocks = document.querySelectorAll(
      '[data-parallax="transformY"]'
  );

  window.gsap.set(transformYBlocks, {
    y: 70,
  });
  const tl = window.gsap.timeline();

  tl.to(transformYBlocks, {
    y: 0,
  });

  ScrollTrigger.create({
    animation: tl,
    scrub: true,
    trigger: transformYBlocks,
    start: 'top bottom',
    end: 'bottom top',
  });
};

const initIntroParallax = () => {
  const container = document.querySelector('#intro .container');
  const introCards = document.querySelectorAll('.intro__cards');

  const tl = window.gsap.timeline();

  tl.to(container, {
    scale: 0.75,
    opacity: 0.5,
    rotateX: 5,
    y: -10,
  }).to(
      introCards,
      {
        scale: 0.7,
      },
      '<'
  );

  ScrollTrigger.create({
    animation: tl,
    scrub: true,
    trigger: '#menu',
    start: 'top bottom',
    end: 'bottom top',
  });
};

const initParallaxScroll = () => {
  initFadeScale();
  initTransformY();
  initIntroParallax();
};

export {initParallaxScroll};
