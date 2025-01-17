const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector(".botao_menu");

menuButton.addEventListener("click", () => {
  navbar.classList.toggle("show_menu");
});