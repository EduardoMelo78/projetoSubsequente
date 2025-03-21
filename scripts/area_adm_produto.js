function listar_produtos() {
    fetch('http://localhost:8080/produtos')
      .then(resposta => resposta.json())
      .then(produtos => {

        const header = document.querySelector("#header_produto");
        const tabela = document.querySelector("#tabela_produtos");

      
        tabela.innerHTML = '';
        header.innerHTML = ''; 

        if(produtos.length >0){
        document.querySelector('.listar_produtos').style.display = 'none';
        document.querySelector('.deslistar_produtos').style.display = 'block';

        header.innerHTML =
        ` 
            <td>ID</td>
            <td>Nome</td>
            <td>Valor</td>
            <td>Descrição</td>
            <td>Estoque</td>
            <td>Whatsapp</td>
            <td>Foto</td>
            <td>Nome departamento</td>
            <td>Ações</td>
        `
        console.log(produtos)
        }else{
            header.innerHTML = `<div class= "nenhum"> Nenhum produto cadastrado</div>\n`
    
    }

        produtos.forEach(produto => {

        const formId = produto.id

          tabela.innerHTML += `
            <tr class="linha_tabela">
              <td>
                  <input type="number" name="id" value="${produto.id}" readonly>
              </td>
              <td>
                <input type="text" name="nome" id="nome_${produto.id}" value="${produto.nome}">
              </td>
              <td>
                <input type="number" name="valor" id="valor_${produto.id}" value="${produto.valor}">
              </td>
              <td>
                <input type="text" name="descricao" id="descricao_${produto.id}" value="${produto.descricao}">
              </td>
              <td>
                <input type="number" name="estoque" id="estoque_${produto.id}" value="${produto.estoque}">
                <input type="hidden" name="data_cadastro" id="data_cadastro_${produto.id}" value="${produto.data_cadastro}">
              </td>
              <td>
                <div> ${produto.departamento.whatsapp} </div>
                <input type="hidden" name="departamento" id="departamento_id_${produto.id}" value="${produto.departamento.id}">
              </td>
              <td>
                <img src="${produto.foto}">
                <input type="hidden" name="foto" id="foto_${produto.id}" value = "${produto.foto}">
              </td>
              <td>
                ${produto.departamento.nome}
              </td>
              <td>
                <form id="${formId}" onsubmit="event.preventDefault(); editar_produto('${produto.id}', '${formId}')">
                    <button type="submit" class="btn" >Editar</button>
                    <button type="button" class ="btn" onclick="deletar_produto(${produto.id})">Deletar</button>
                </form>
              </td>
            </tr>
          `
        })
       
      })
      .then(() => console.log.ok)
      .catch(err => console.log(err));
}

function editar_produto(id, formId) {
  
    // Ajustar o objeto de dados para refletir os campos do produto
    const data = {
      id: id,
      nome: document.getElementById(`nome_${id}`).value,
      valor: document.getElementById(`valor_${id}`).value,
      descricao: document.getElementById(`descricao_${id}`).value,
      estoque: document.getElementById(`estoque_${id}`).value,
      foto: document.getElementById(`foto_${id}`).value,
      data_cadastro: document.getElementById(`data_cadastro_${id}`).value,
      departamento : {id : document.getElementById(`departamento_id_${id}`).value}
    };
  
    // Ajustar a URL para atualizar produtos em vez de departamentos
    fetch(`http://localhost:8080/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resposta => {
      if (resposta.ok) {
        alert('Produto atualizado com sucesso!');
        listar_produtos();
      } else {
        console.error('Erro ao atualizar produto:', resposta.status);
        alert('Erro ao atualizar produto.');
      }
    })
    .catch(erro => console.error('Erro na requisição:', erro));
  }

function deletar_produto(id) {
    fetch(`http://localhost:8080/produtos/${id}`, {
    method: 'DELETE'
    })
    .then(resposta => {
    if (resposta.ok) {
        alert('Produto deletado com sucesso!');}
    })
    .then(() => listar_produtos())
}
    
function deslistar_produtos(){
    document.querySelector("#header_produto").innerHTML = '';
    document.querySelector("#tabela_produtos").innerHTML = '';

    
    document.querySelector('.listar_produtos').style.display = 'block';
    document.querySelector('.deslistar_produtos').style.display = 'none';
}

function buscar_produto() {
    const id = document.getElementById('pesquisar_produto').value;
  
    if (id === '') {
      console.log('Por favor, insira um ID válido.');
      return;
    }
  
    fetch(`http://localhost:8080/produtos/${id}`)
      .then(resposta => resposta.json())
      .then(produto => {
        if (produto){

            const header = document.querySelector("#header_produto");
            const tabela = document.querySelector("#tabela_produtos");
    
            tabela.innerHTML = '';
            header.innerHTML = ''; 
    
            document.querySelector('.listar_produtos').style.display = 'none';
            document.querySelector('.deslistar_produtos').style.display = 'block';
    
            header.innerHTML =
            ` 
                <td>ID</td>
                <td>Nome</td>
                <td>Valor</td>
                <td>Descrição</td>
                <td>Estoque</td>
                <td>Whatsapp</td>
                <td>Foto</td>
                <td>Nome departamento</td>
                <td>Ações</td>
            `
    
                const formId = produto.id
                tabela.innerHTML += `
                <tr class="linha_tabela">
              <td>
                  <input type="number" name="id" value="${produto.id}" readonly>
              </td>
              <td>
                <input type="text" name="nome" id="nome_${produto.id}" value="${produto.nome}">
              </td>
              <td>
                <input type="number" name="valor" id="valor_${produto.id}" value="${produto.valor}">
              </td>
              <td>
                <input type="text" name="descricao" id="descricao_${produto.id}" value="${produto.descricao}">
              </td>
              <td>
                <input type="number" name="estoque" id="estoque_${produto.id}" value="${produto.estoque}">
                <input type="hidden" name="data_cadastro" id="data_cadastro_${produto.id}" value="${produto.data_cadastro}">
              </td>
              <td>
                <div> ${produto.departamento.whatsapp} </div>
                <input type="hidden" name="departamento" id="departamento_id_${produto.id}" value="${produto.departamento.id}">
              </td>
              <td>
                <img src="${produto.foto}">
                <input type="hidden" name="foto" id="foto_${produto.id}" value = "${produto.foto}">
              </td>
              <td>
                ${produto.departamento.nome}
              </td>
              <td>
                <form id="${formId}" onsubmit="event.preventDefault(); editar_produto('${produto.id}', '${formId}')">
                    <button type="submit" class="btn" >Editar</button>
                    <button type="button" class ="btn" onclick="deletar_produto(${produto.id})">Deletar</button>
                </form>
              </td>
            </tr>
              `
        } else {
            header.innerHTML = `<div class="nenhum">Nenhum Produto cadastrado</div>`;
          }
    
    })
    .catch(erro => {
          alert('Erro ao buscar Produto ou produto não existe');
    });
}
  