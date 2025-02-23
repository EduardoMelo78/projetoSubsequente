document.querySelector("#login_box").addEventListener("submit", autenticar)


function autenticar(event){

    event.preventDefault();
    const login = new FormData(event.target)

    const jsonUsuario = {
        "usuario" : login.get("usuario"),
        "senha" : login.get("senha")
    }

    fetch("http://localhost:8080/usuarios")
    .then( resposta => resposta.json())
    .then( usuarios => {
        usuarios.map( usuario => {
            if(jsonUsuario.usuario == usuario.usuario){
                if(jsonUsuario.senha == usuario.senha){
                    localStorage.setItem("usuarioLogado", JSON.stringify(usuario))
                    window.location.href = "/telas/usuarios/my_home.html"
                }else{
                    const error = document.querySelector('.mensagem_error');
                    error.style.display = 'block';
                    setTimeout(() => {
                        error.style.display = 'none';
                    }, 5000);
                }
            }else{
            const error = document.querySelector('.mensagem_error');
            error.style.display = 'block';
            setTimeout(() => {
                error.style.display = 'none';
            }, 5000);
        }
        })
    })
}

