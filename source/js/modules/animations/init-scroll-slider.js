import {ScrollTrigger} from '../../vendor/scroll-trigger';
const parentSlides = document.querySelector('[data-scroll-slider="parent"]');
const slides = document.querySelectorAll('[data-scroll-slider="slide"]');

slides[0].classList.add('is-active');

let currentSlide;

const backgroundImages = [
  'url(img/svg/architect-bg.svg)',
  'url(img/svg/squares-bg.svg)',
  'url(img/svg/plus-bg.svg)',
  'url(img/svg/graph-paper-bg.svg)'
];

let countHeightSlide = 0;

const setBackground = () => {
  slides.forEach((item, index) => {
    item.style.backgroundImage = backgroundImages[index];
  });
};
const setSlidesHeight = () => {
  slides.forEach((slide) => {
    countHeightSlide += slide.clientHeight;
  });
  window.gsap.set(parentSlides, {minHeight: countHeightSlide + 'px'});
};

const switchSlide = (self) => {
  if (self.progress === 0) {
    currentSlide = 0;
  } else {
    currentSlide = Math.ceil(self.progress / (1 / slides.length) - 1);
  }
  slides.forEach((slide) => {
    slide.classList.remove('is-active');
  });

  slides[currentSlide].classList.add('is-active');
};

const initScrollSlider = () => {
  setSlidesHeight();
  setBackground();

  ScrollTrigger.create({
    trigger: parentSlides,
    scrub: true,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: switchSlide,
  });
};

export {initScrollSlider};
