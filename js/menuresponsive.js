const menuBtn = document.querySelector('#menu-btn');
const menuMobile = document.querySelector('#menu-mobile');

menuBtn.addEventListener('click', () => {
  menuMobile.classList.toggle('menu-open');
});

/* submenús mobile */
const submenuBtns = document.querySelectorAll('.mobile-submenu-btn');

submenuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const list = btn.nextElementSibling;
    list.classList.toggle('open');
  });
});
