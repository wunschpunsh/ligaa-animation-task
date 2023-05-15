const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const button = document.querySelector('[data-menu-button]');

const isPhone =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

let isOpen = false;

const openMenu = () => {
  header.classList.add('menu-opened');
  menu.classList.add('is-active');
  button.classList.add('is-active');
  window.scrollLock.disableScrolling();
  isOpen = true;
  if (!isPhone) {
    menu.style.paddingRight = '17px';
    header.style.paddingRight = '17px';
  }
};

const closeMenu = () => {
  header.classList.remove('menu-opened');
  menu.classList.remove('is-active');
  button.classList.remove('is-active');
  window.scrollLock.enableScrolling();
  isOpen = false;
  if (!isPhone) {
    menu.style.paddingRight = '0';
    header.style.paddingRight = '0';
  }
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
