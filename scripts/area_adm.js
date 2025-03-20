document.querySelector(".logout").addEventListener('click', deslogar);
function deslogar(){
    localStorage.removeItem("usuarioLogado")
    window.location.href = "login.html"
}


const usuarioLogado = localStorage.getItem("usuarioLogado")
const usuario = JSON.parse(usuarioLogado)

if(usuarioLogado == null){
    window.location.href = "/telas/usuarios/login.html";
}


if(usuario.usuario !== "ADMIN" || usuario.senha !== "Edumelo@78"){
   window.location.href= "/telas/usuarios/my_home.html";
  }





/*-------------------USUARIOS -----------------------------------*/ 

