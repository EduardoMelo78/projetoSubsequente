function listar_departamentos() {
    fetch('http://localhost:8080/departamentos')
      .then(resposta => resposta.json())
      .then(departamentos => {

        const header = document.querySelector("#header_departamento");
        const tabela = document.querySelector("#tabela_departamentos");

        tabela.innerHTML = '';
        header.innerHTML = ''; 

        if(departamentos.length >0){

            
        document.querySelector('.listar_dept').style.display = 'none';
        document.querySelector('.deslistar_dept').style.display = 'block';

            header.innerHTML =
            ` 
                <td>ID</td>
                  <td>Nome</td>
                  <td>Descrição</td>
                  <td>Whatsapp</td>
                  <td>Logo</td>
                  <td>Usuário responsável</td>
                  <td>Ações</td>
            `

            departamentos.forEach(departamento => {

                const formId = `form_${departamento.id}`
                  tabela.innerHTML += `
                    <tr class="linha_tabela">
                      <td>
                          <input type="number" name="id" value="${departamento.id}" readonly>
                      </td>
                      <td>
                        <input type="text" name="nome" id="nome_${departamento.id}" value="${departamento.nome}">
                      </td>
                      <td>
                        <input type="text" name="descricao" id="descricao_${departamento.id}" value="${departamento.descricao}">
                      </td>
                      <td>
                        <input type="text" name="whatsapp" id="whatsapp_${departamento.id}" value="${departamento.whatsapp}">
                      </td>
                      <td>
                        <img src="${departamento.logo}">
                        <input type="hidden" name="logo" id="logo_${departamento.id}" value = "${departamento.logo}">
                      </td>

                      <td>
                        ${departamento.usuario.nome}

                        <!--Dados do departamento para enviar ao FORM de EDIÇÃO-->
                        <input type="hidden" name="usuario" id = "usuario_id__${departamento.id} value="${departamento.usuario.id}">
                      </td>

                      <td>
                        <form id="${formId}" onsubmit="event.preventDefault(); editar_departamento('${departamento.id}', '${formId}')">
                            <button type="submit" class = "btn">Editar</button>
                            <button type="button" class = "btn" onclick="deletar_departamento(${departamento.id})">Deletar</button>
                        </form>
                      </td>
                    </tr>
                  `
                })

            }else{
                header.innerHTML = `<div class= "nenhum"> Nenhum departamento cadastrado</div>\n`
        }
       
      })
      .then(() => console.log.ok)
      .catch(err => console.log(err));
}

function editar_departamento(id, formId) {

    const usuarioId = document.getElementById(`usuario_id_${id}`).value

    const data = {
        id: id,
        nome: document.getElementById(`nome_${id}`).value,
        descricao: document.getElementById(`descricao_${id}`).value,
        logo: document.getElementById(`logo_${id}`).value,
        whatsapp : document.getElementById(`whatsapp_${id}`).value,
        usuario: {
            id: usuarioId
        }
    };

  

    fetch(`http://localhost:8080/departamentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resposta => {
        if (resposta.ok) {
            alert('Departamento atualizado com sucesso!');
            listar_departamentos();
        } else {
            console.error('Erro ao atualizar departamento:', resposta.status);
            alert('Erro ao atualizar departamento.');
        }
    })
    .catch(erro => console.error('Erro na requisição:', erro));
}

function deslistar_departamento(){
document.querySelector("#header_departamento").innerHTML = '';
document.querySelector("#tabela_departamentos").innerHTML = '';


document.querySelector('.listar_dept').style.display = 'block';
document.querySelector('.deslistar_dept').style.display = 'none';
}

function deletar_departamento(id) {
fetch(`http://localhost:8080/departamentos/${id}`, {
method: 'DELETE'
})
.then(resposta => {
if (resposta.ok) {
    console.log('Departamento deletado com sucesso!');}
})
.then(() => listar_departamentos())
}

function buscar_departamento() {
  const id = document.getElementById('pesquisar_departamento').value;

  if (id === '') {
    console.log('Por favor, insira um ID válido.');
    return;
  }

  fetch(`http://localhost:8080/departamentos/${id}`)
    .then(resposta => resposta.json())
    .then(departamento => {
      if (departamento) {
        const header = document.querySelector("#header_departamento");
        const tabela = document.querySelector("#tabela_departamentos");

        tabela.innerHTML = '';
        header.innerHTML = '';

        document.querySelector('.listar_dept').style.display = 'none';
        document.querySelector('.deslistar_dept').style.display = 'block';

        header.innerHTML = `
          <td>ID</td>
          <td>Nome</td>
          <td>Descrição</td>
          <td>Whatsapp</td>
          <td>Logo</td>
          <td>Usuário responsável</td>
          <td>Ações</td>
        `;

        const formId = `form_${departamento.id}`;
        tabela.innerHTML += `
          <tr class="linha_tabela">
            <td>
              <input type="number" name="id" value="${departamento.id}" readonly>
            </td>
            <td>
              <input type="text" name="nome" id="nome_${departamento.id}" value="${departamento.nome}">
            </td>
            <td>
              <input type="text" name="descricao" id="descricao_${departamento.id}" value="${departamento.descricao}">
            </td>
            <td>
              <input type="text" name="whatsapp" id="whatsapp_${departamento.id}" value="${departamento.whatsapp}">
            </td>
            <td>
              <img src="${departamento.logo}">
              <input type="hidden" name="logo" id="logo_${departamento.id}" value="${departamento.logo}">
            </td>
            <td>
              ${departamento.usuario.nome}
              <!-- Dados do departamento para enviar ao FORM de EDIÇÃO -->
              <input type="hidden" name="usuario" id="usuario_id_${departamento.id}" value="${departamento.usuario.id}">
            </td>
            <td>
              <form id="${formId}" onsubmit="event.preventDefault(); editar_departamento('${departamento.id}', '${formId}')">
                <button type="submit" class="btn">Editar</button>
                <button type="button" class="btn" onclick="deletar_departamento(${departamento.id})">Deletar</button>
              </form>
            </td>
          </tr>
        `;
      } else {
        header.innerHTML = `<div class="nenhum">Nenhum departamento cadastrado</div>`;
      }
    })
    .catch(erro => {
      alert('Erro ao buscar departamento');
    });
}