const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector(".botao_menu");

menuButton.addEventListener("click", () => {
  navbar.classList.toggle("show_menu");
});


const usuarioLogado = localStorage.getItem("usuarioLogado")

if(usuarioLogado == null){
    window.location.href = "login.html"
}

const usuario = JSON.parse(usuarioLogado)
document.querySelector("#nome").textContent = "olá, " + usuario.usuario

document.querySelector(".logout").addEventListener('click', deslogar);
function deslogar(){
    localStorage.removeItem("usuarioLogado")
    window.location.href = "login.html"
}

if(usuario.usuario == "ADMIN" && usuario.senha == "Edumelo@78"){
  document.querySelector("#area_adm").style.display = "block";
}