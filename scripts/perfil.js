const usuarioLogado = localStorage.getItem("usuarioLogado")
let usuario = JSON.parse(usuarioLogado)

plotarDados(usuario)

function plotarDados(usuario){

    const divHtml = document.querySelector(".dados_usuario")
    divHtml.innerHTML = `

    <form id="form_editar_usuario">

        <div>
            <div class="titulo_form">
                <h2>Usuario</h2>
            </div>

            <div class="inputs">   

                <div class= "input">
                    <label>ID: </label>
                    <p>${usuario.id}</p>
                </div>

                <div class= "input">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" value="${usuario.nome}" name = "nome">
                </div>

                <div class= "input">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" value="${usuario.cpf}" name = "cpf">
                </div>

                <div class= "input">
                    <label for="data_nascimento">Data de Nascimento:</label>
                    <input type="date" id="data_nascimento" value="${usuario.dataNascimento}" name="data_nascimento">
                </div>

                <div class= "input">
                    <label for="email">Email:</label>
                    <input type="email" id="email" value="${usuario.email}" name="email">
                </div>

                <div class= "input">
                    <label for="telefone">Telefone:</label>
                    <input type="text" id="telefone" value="${usuario.telefone}" name="telefone">
                </div>

                <div class= "input">
                    <label for="usuario">Nome Usuário:</label>
                    <input type="text" id="usuario" value="${usuario.usuario}" name="usuario">
                </div>

                <div class= "input">
                    <label for="senha">Senha:</label>
                    <input type="text" id="senha" value="${usuario.senha}" name="senha">
                </div>

            </div>
        </div>

        <div class = "endereco">

            <div class="titulo_form">
                <h2>Endereço</h2>
             </div>

            <div class="inputs">

                <div class="input">
                    <label for="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" value="${usuario.endereco.cep}" placeholder="Apenas números">
                </div>

                <div class="input">
                    <label for="cidade">Cidade:</label>
                    <input type="text" id="cidade" name="cidade" value="${usuario.endereco.municipio}" required>
                </div>

                
                <div class="input">
                    <label for="bairro">Bairro:</label>
                    <input type="text" id="bairro" name="bairro" value="${usuario.endereco.bairro}" required>
                </div>

                <div class="input">
                    <label for="rua">Rua:</label>
                    <input type="text" id="rua" name="rua" value="${usuario.endereco.rua}" required>
                </div>

                <div class="input">
                    <label for="numero">Número:</label>
                    <input type="text" id="numero" name="numero" value="${usuario.endereco.numero}" required>
                </div>

                <div class="input">
                    <label for="complemento">Complemento:</label>
                    <input type="text" id="complemento" name="complemento" value="${usuario.endereco.complemento}" required>
                </div>

                <div class="input">
                    <label for="estado">Estado:</label>
                    <input type="text" id="estado" name="estado" value="${usuario.endereco.estado}" required>
                </div>
            </div>
        </div>

        <div class = "buttons">
        <button type="submit" class="btn_editar">Editar</button>
        <button type="button" class="btn_editar" onclick="deletarUsuario()">Deletar</button>
        </div>
    </form>
    `
}

document.querySelector("#form_editar_usuario").addEventListener("submit", editarUsuario)

function editarUsuario(event){

    
    const formulario = new FormData(event.target)

    // Atualiza os dados do usuário no localStorage
    usuario.nome = formulario.get("nome")
    usuario.cpf = formulario.get("cpf")
    usuario.dataNascimento = formulario.get("data_nascimento")
    usuario.email = formulario.get("email")
    usuario.telefone = formulario.get("telefone")
    usuario.usuario = formulario.get("usuario")
    usuario.senha = formulario.get("senha")

    usuario.endereco.cep = formulario.get("cep")
    usuario.endereco.municipio = formulario.get("cidade")
    usuario.endereco.bairro = formulario.get("bairro")
    usuario.endereco.rua = formulario.get("rua")
    usuario.endereco.numero = formulario.get("numero")
    usuario.endereco.complemento = formulario.get("complemento")
    usuario.endereco.estado = formulario.get("estado")
    
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario))

    fetch('http://localhost:8080/usuarios/' + usuario.id,{
        method: "PUT",
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(usuario)})
        .then(resposta => {
            if (!resposta.ok) {
              throw new Error('Erro ao Editar usuario');
            }
            return resposta.json();})
        .then(alert("Usuario editado com sucesso!"))
        .catch(err => console.error(err));
    
}

function deletarUsuario(){
    console.log(usuario.id)
    fetch('http://localhost:8080/usuarios/' + usuario.id,{
        method: "DELETE",
        headers: {'content-type' : 'application/json'}})
        .then(resposta => {
            if (!resposta.ok) {
                alert("Usuário não pode ser deletado, entre em contato com o ADM! link :https://wa.me/qr/ESLMURW45R5PO1 ou telefone: 82981350920" )
              throw new Error('Erro ao Deletar usuario');
            }
            return resposta})
        .then(() => {
            alert("Usuário deletado com sucesso!");
            localStorage.removeItem("usuarioLogado");
            window.location.href = '/telas/usuarios/login.html';
            })
        .catch(err => console.error(err));
}
