// Swiper 7.4.1
// import './vendor/swiper';
import './vendor/focus-visible-polyfill';

import {gsap} from './vendor/gsap.min.js';
import {ScrollTrigger} from './vendor/scroll-trigger';
import {ScrollToPlugin} from './vendor/scroll-to-plugin.min.js';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
