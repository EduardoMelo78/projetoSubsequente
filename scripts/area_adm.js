

document.querySelector(".logout").addEventListener('click', deslogar);
function deslogar(){
    localStorage.removeItem("usuarioLogado")
    window.location.href = "login.html"
}