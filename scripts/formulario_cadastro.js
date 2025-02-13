function showForm2() {
    document.getElementById('pessoal').style.display = 'none';
    document.getElementById('endereco').style.display = 'flex';
}

function showForm1() {
    document.getElementById('endereco').style.display = 'none';
    document.getElementById('pessoal').style.display = 'flex';
    
}



document.querySelector("#form_cadastrar").addEventListener("submit", cadastrar)

function cadastrar(event){
    
    event.preventDefault();
    const formulario = new FormData(event.target)

    endereco = {
        "cep" : formulario.get("cep"),
        "municipio" : formulario.get("cidade"),
        "bairro" : formulario.get("bairro"),
        "rua" : formulario.get("rua"),
        "numero" : formulario.get("numero"),
        "complemento" : formulario.get("complemento"),
        "estado" : formulario.get("estado")
    }

    fetch('http://localhost:8080/enderecos',{
        method: "POST",
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(endereco)})
        .then(resposta => {
            if (!resposta.ok) {
              throw new Error('Erro ao cadastrar endereço');
            }
            return resposta.json();})
    .then(enderecoCriado => {
        const usuario = {
        "nome" : formulario.get("nome"),
        "cpf" : formulario.get("cpf"),
        "telefone" : formulario.get("telefone"),
        "email" : formulario.get("email"),
        "dataNascimento": formulario.get("data_nascimento"),
        "usuario" : formulario.get("usuario"),
        "senha" : formulario.get("senha"),
        "adm" : false,
        "endereco_id" : {"id" : enderecoCriado.id}
        }
    })

    console.log(JSON.stringify(usuario));

    fetch('http://localhost:8080/usuarios', {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(usuario)
      })    
    .then(respostaUsuario => {
      if (respostaUsuario.ok) {
        alert("Usuário cadastrado com sucesso!");
      } else {
        throw new Error('Erro ao cadastrar usuário');
      }
    })
    .catch(err => console.error(err));

    

    window.location.href = "login.html";
}


