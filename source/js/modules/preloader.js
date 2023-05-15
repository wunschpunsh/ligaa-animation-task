import {ScrollLock} from '../utils/scroll-lock';

export class Preloader {
  constructor() {
    this.preloader = document.querySelector('[data-preloader]');
    this.scrollLock = new ScrollLock();
    this.event = new Event('loaderOff');
    this.pageLoaded = false;
    this.off = this.off.bind(this);
  }

  on() {
    this.scrollLock.disableScrolling();
  }

  off() {
    this.scrollLock.enableScrolling();
    window.dispatchEvent(this.event);
    this.pageLoaded = true;
    if (!this.preloader) {
      return;
    }
    this.preloader.classList.add('is-hidden');
  }

  init() {
    window.scrollTo(0, 0);
    this.on();
    window.addEventListener('load', () => {
      setTimeout(this.off, 2000);
    });
  }
}
