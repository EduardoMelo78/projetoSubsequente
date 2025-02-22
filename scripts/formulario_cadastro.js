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

     usuario = {
      "nome" : formulario.get("nome"),
      "cpf" : formulario.get("cpf"),
      "telefone" : formulario.get("telefone"),
      "email" : formulario.get("email"),
      "dataNascimento": formulario.get("data_nascimento"),
      "usuario" : formulario.get("usuario"),
      "senha" : formulario.get("senha"),
      "endereco" : {"cep" : formulario.get("cep"),
      "municipio" : formulario.get("cidade"),
      "bairro" : formulario.get("bairro"),
      "rua" : formulario.get("rua"),
      "numero" : formulario.get("numero"),
      "complemento" : formulario.get("complemento"),
      "estado" : formulario.get("estado")}
      }

    fetch('http://localhost:8080/usuarios',{
        method: "POST",
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(usuario)})
        .then(resposta => {
            if (!resposta.ok) {
              throw new Error('Erro ao cadastrar usuario');
            }
            return resposta.json();})
        .catch(err => console.error(err));

        window.location.href = "login.html";

}


