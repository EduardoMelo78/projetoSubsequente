function listar_usuarios() {
    fetch('http://localhost:8080/usuarios')
      .then(resposta => resposta.json())
      .then(usuarios => {
        const header = document.querySelector("#header_usuario");
        const tabela = document.querySelector("#tabela_usuarios");
  
        tabela.innerHTML = '';
        header.innerHTML = ''; 
  
        if(usuarios.length >0){
          document.querySelector('.listar_usuarios').style.display = 'none';
          document.querySelector('.deslistar_usuarios').style.display = 'block';
  
          header.innerHTML = ` 
            <td>ID</td>
            <td>Nome</td>
            <td>Email</td>
            <td>CPF</td>
            <td>Telefone</td>
            <td>Nome Usuario</td>
            <td>Senha</td>
            <td>Ações</td>
          `
          usuarios.forEach(usuario => {
            const formId = `form_${usuario.id}`
            tabela.innerHTML += `
              <tr class="linha_tabela">
                <td>
                  <input type="number" name="id" value="${usuario.id}" readonly>
                </td>
                <td>
                  <!-- CORREÇÃO: Adiciona id único usando o id do usuário -->
                  <input type="text" name="nome" id="nome_${usuario.id}" value="${usuario.nome}">
                </td>
                <td>
                  <input type="email" name="email" id="email_${usuario.id}" value="${usuario.email}">
                </td>
                <td>
                  <input type="text" name="cpf" id="cpf_${usuario.id}" value="${usuario.cpf}">
                </td>
                <td>
                  <input type="text" name="telefone" id="telefone_${usuario.id}" value="${usuario.telefone}">
                </td>
                <td>
                  <input type="text" name="username" id="username_${usuario.id}" value="${usuario.usuario}">
                </td>
                <td>
                  <input type="text" name="senha" id="senha_${usuario.id}" value="${usuario.senha}">
                  
                  <! -- CAMPOS OCULTOS PARA PREENCHER ENDERECO-->
                  <input type="hidden" name="dataNascimento" id="dataNascimento_${usuario.id}" value="${usuario.dataNascimento}">
                  <input type="hidden" id="endereco_id_${usuario.id}" value="${usuario.endereco.id}">
                  <input type="hidden" id="cep_${usuario.id}" value="${usuario.endereco.cep}">
                  <input type="hidden" id="municipio_${usuario.id}" value="${usuario.endereco.municipio}">
                  <input type="hidden" id="bairro_${usuario.id}" value="${usuario.endereco.bairro}">
                  <input type="hidden" id="rua_${usuario.id}" value="${usuario.endereco.rua}">
                  <input type="hidden" id="numero_${usuario.id}" value="${usuario.endereco.numero}">
                  <input type="hidden" id="complemento_${usuario.id}" value="${usuario.endereco.complemento}">
                  <input type="hidden" id="estado_${usuario.id}" value="${usuario.endereco.estado}">
                </td>
                </td>
                <td>
                  <form id="${formId}" onsubmit="event.preventDefault(); editar_usuario('${usuario.id}', '${formId}')">
                    <button type="submit" class = "btn editar">Editar</button>
                    <button type="button" class = "btn deletar" onclick="deletar_usuario('${usuario.id}')">Deletar</button>
                  </form>
                </td>
              </tr>
            `;
          });
        } else {
          header.innerHTML = `<div class= "nenhum"> Nenhum usuario cadastrado</div>\n`;
        }
      })
      .catch(err => console.error("Erro ao listar usuários:", err));
  }
  
  
  function editar_usuario(id, formId) {
    const form = document.getElementById(formId);
  
    const data = { 
      id: id,
      nome: document.getElementById(`nome_${id}`).value,
      email: document.getElementById(`email_${id}`).value,
      cpf: document.getElementById(`cpf_${id}`).value,
      telefone: document.getElementById(`telefone_${id}`).value,
      usuario: document.getElementById(`username_${id}`).value,
      senha: document.getElementById(`senha_${id}`).value,
      dataNascimento : document.getElementById(`dataNascimento_${id}`).value,
      endereco : {id: document.getElementById(`endereco_id_${id}`).value,
                  cep: document.getElementById(`cep_${id}`).value,
                  municipio: document.getElementById(`municipio_${id}`).value,
                  bairro: document.getElementById(`bairro_${id}`).value,
                  rua: document.getElementById(`rua_${id}`).value,
                  numero: document.getElementById(`numero_${id}`).value,
                  complemento: document.getElementById(`complemento_${id}`).value,
                  estado: document.getElementById(`estado_${id}`).value
    }
    };
  
    fetch(`http://localhost:8080/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resposta => {
      if (resposta.ok) {
        alert('Usuário atualizado com sucesso!');
        listar_usuarios();
      } else {
        console.error('Erro ao atualizar usuário:', resposta.status);
        alert('Erro ao atualizar usuário.');
      }
    })
    .catch(erro => console.error('Erro na requisição:', erro));
  }
  
  
  function deletar_usuario(id) {
      fetch(`http://localhost:8080/usuarios/${id}`, {
      method: 'DELETE'
      })
      .then(resposta => {
      if (resposta.ok) {
          console.log('Usuario deletado com sucesso!');}
      })
      .then(() => listar_usuarios())
  }
  
  function deslistar_usuarios(){
      document.querySelector("#header_usuario").innerHTML = '';
      document.querySelector("#tabela_usuarios").innerHTML = '';
  
      
      document.querySelector('.listar_usuarios').style.display = 'block';
      document.querySelector('.deslistar_usuarios').style.display = 'none';
  }
  
  function buscar_usuario_id() {
    const id = document.getElementById('pesquisar_id_usuario').value;
  
    if (id === '') {
        alert('Por favor, insira um ID válido.');
        return;
    }
  
    fetch(`http://localhost:8080/usuarios/${id}`)
        .then(resposta => resposta.json())
        .then(usuario => {
            if (usuario) {
                // Limpa a tabela atual
                document.querySelector("#header_usuario").innerHTML = '';
                document.querySelector("#tabela_usuarios").innerHTML = '';

                document.querySelector('.listar_usuarios').style.display = 'none';
                document.querySelector('.deslistar_usuarios').style.display = 'block';
  
                // Exibe o cabeçalho da tabela
                document.querySelector("#header_usuario").innerHTML = `
                    <td>ID</td>
                    <td>Nome</td>
                    <td>Email</td>
                    <td>CPF</td>
                    <td>Telefone</td>
                    <td>Nome Usuario</td>
                    <td>Senha</td>
                    <td>Ações</td>
                `;
  
                // Exibe o usuário encontrado
                const formId = `form_${usuario.id}`;
                document.querySelector("#tabela_usuarios").innerHTML += `
                    <tr class="linha_tabela">
                        <td>
                            <input type="number" name="id" value="${usuario.id}" readonly>
                        </td>
                        <td>
                            <input type="text" name="nome" id="nome_${usuario.id}" value="${usuario.nome}">
                        </td>
                        <td>
                            <input type="email" name="email" id="email_${usuario.id}" value="${usuario.email}">
                        </td>
                        <td>
                            <input type="text" name="cpf" id="cpf_${usuario.id}" value="${usuario.cpf}">
                        </td>
                        <td>
                            <input type="text" name="telefone" id="telefone_${usuario.id}" value="${usuario.telefone}">
                        </td>
                        <td>
                            <input type="text" name="username" id="username_${usuario.id}" value="${usuario.usuario}">
                        </td>
                        <td>
                            <input type="text" name="senha" id="senha_${usuario.id}" value="${usuario.senha}">
                            <input type="hidden" name="dataNascimento" id="dataNascimento_${usuario.id}" value="${usuario.dataNascimento}">
                            <input type="hidden" id="endereco_id_${usuario.id}" value="${usuario.endereco.id}">
                            <input type="hidden" id="cep_${usuario.id}" value="${usuario.endereco.cep}">
                            <input type="hidden" id="municipio_${usuario.id}" value="${usuario.endereco.municipio}">
                            <input type="hidden" id="bairro_${usuario.id}" value="${usuario.endereco.bairro}">
                            <input type="hidden" id="rua_${usuario.id}" value="${usuario.endereco.rua}">
                            <input type="hidden" id="numero_${usuario.id}" value="${usuario.endereco.numero}">
                            <input type="hidden" id="complemento_${usuario.id}" value="${usuario.endereco.complemento}">
                            <input type="hidden" id="estado_${usuario.id}" value="${usuario.endereco.estado}">
                        </td>
                        <td>
                            <form id="${formId}" onsubmit="event.preventDefault(); editar_usuario('${usuario.id}', '${formId}')">
                                <button type="submit" class="btn">Editar</button>
                                <button type="button" class="btn" onclick="deletar_usuario('${usuario.id}')">Deletar</button>
                            </form>
                        </td>
                    </tr>
                `;
            } else {
                alert('Usuário não encontrado.');
            }
        })
        .catch(erro => {
            alert('Erro ao buscar usuário.');
        });
  }