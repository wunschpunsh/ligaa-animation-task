const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const button = document.querySelector('[data-menu-button]');

let isOpen = false;

const openMenu = () => {
  header.classList.add('menu-opened');
  menu.classList.add('is-active');
  button.classList.add('is-active');
  window.scrollLock.disableScrolling();
  isOpen = true;
};

const closeMenu = () => {
  header.classList.remove('menu-opened');
  menu.classList.remove('is-active');
  button.classList.remove('is-active');
  window.scrollLock.enableScrolling();
  isOpen = false;
};

const onButtonClick = () => {
  if (isOpen) {
    closeMenu();
    return;
  }

  openMenu();
};

const initMenu = () => {
  if (!button) {
    return;
  }

  button.addEventListener('click', onButtonClick);
};

export {initMenu};
