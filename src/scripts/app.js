// hide navbar on scroll
let prevScrollPos = window.scrollY;
window.onscroll = () => {
  const nav = document.getElementById("nav");
  let currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    nav.style.top = "0";
  } else {
    nav.style.top = "-75px";
  }
  prevScrollPos = currentScrollPos;
};
