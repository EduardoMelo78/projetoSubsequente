function listar_vendas() {
    fetch('http://localhost:8080/vendas')
      .then(resposta => resposta.json())
      .then(vendas => {

        const header = document.querySelector("#header_venda");
        const tabela = document.querySelector("#tabela_vendas");

      
        tabela.innerHTML = '';
        header.innerHTML = ''; 

        if(vendas.length >0){

        document.querySelector('.listar_vendas').style.display = 'none';
        document.querySelector('.deslistar_vendas').style.display = 'block';

        header.innerHTML =
        ` 
            <td>ID</td>
            <td>Data</td>
            <td>Nome departamento</td>
            <td>Nome do vendedor</td>
            <td>Nome Produto</td>
            <td>Nome Cliente</td>
            <td>Quantidade</td>
            <td>Valor total</td>
            <td>Tipo de pagamento</td>
            <td>Ações</td>
        `
        console.log(vendas)
        }else{
            header.innerHTML = `<div class= "nenhum"> Nenhuma Venda cadastrada</div>\n`
             }
  
        vendas.forEach(venda => {

        const formId = venda.id

          tabela.innerHTML += `
            <tr class="linha_tabela">
              <td>
                  <input type="number" name="id" value="${venda.id}" readonly>
              </td>
              <td>
                <input type="date" name="data" id="data_${venda.id}" value="${venda.data}" form="${formId}">
              </td>
              <td>
                <div>${venda.produto.departamento.nome}</div>
              </td>
              <td>
                <div> ${venda.produto.departamento.usuario.nome} </div>
              </td>
              <td>
                <div> ${venda.produto.nome} </div>
              </td>
              <td>
                <div>${venda.usuario.nome} </div>
                <input type="hidden" name="cliente_id" id="cliente_id_${venda.id}" value="${venda.usuario.id}">
                <input type="hidden" name="produto_id" id="produto_id_${venda.id}" value="${venda.produto.id}">
              </td>
              <td>
                <input type="number" name="quantidade" id="quantidade_${venda.id}" value="${venda.quantidade}">
              </td>
              <td>
                <input type="number" name="valorTotal" id="valorTotal_${venda.id}" value="${venda.valorTotal}">
              </td>
              <td>
                <input type="text" name="tipoPagamento" id="tipoPagamento_${venda.id}" value="${venda.tipoPagamento}">
              </td>
              <td>
                <form id="${formId}" onsubmit="event.preventDefault(); editar_venda('${venda.id}', '${formId}')">
                    <button type="submit" class="btn">Editar</button>
                    <button type="button" class="btn" onclick="deletar_venda(${venda.id})">Deletar</button>
                </form>
              </td>
            </tr>
          `
        })
       
      })
      .then(() => console.log.ok)
      .catch(err => console.log(err));
}

function editar_venda(id, formId) {
  
    // Ajustar o objeto de dados para refletir os campos do produto
    const data = {
      id: id,
      data: document.getElementById(`data_${id}`).value,
      valorTotal: document.getElementById(`valorTotal_${id}`).value,
      quantidade: document.getElementById(`quantidade_${id}`).value,
      tipoPagamento: document.getElementById(`tipoPagamento_${id}`).value,
      usuario: {id : document.getElementById(`cliente_id_${id}`).value} ,
      produto : {id : document.getElementById(`produto_id_${id}`).value}
    };
  
    // Ajustar a URL para atualizar produtos em vez de departamentos
    fetch(`http://localhost:8080/vendas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resposta => {
      if (resposta.ok) {
        alert('Venda atualizado com sucesso!');
        listar_vendas();
      } else {
        console.error('Erro ao atualizar venda:', resposta.status);
        alert('Erro ao atualizar venda.');
      }
    })
    .catch(erro => console.error('Erro na requisição:', erro));
}


function deletar_venda(id) {
    fetch(`http://localhost:8080/vendas/${id}`, {
    method: 'DELETE'
    })
    .then(resposta => {
    if (resposta.ok) {
        console.log('Venda deletada com sucesso!');}
    })
    .then(() => listar_vendas())
    }
    
function deslistar_vendas(){
    document.querySelector("#header_venda").innerHTML = '';
    document.querySelector("#tabela_vendas").innerHTML = '';

    
    document.querySelector('.listar_vendas').style.display = 'block';
    document.querySelector('.deslistar_vendas').style.display = 'none';
}

function buscar_venda() {
    const id = document.getElementById('pesquisar_venda').value;
  
    if (id === '') {
      console.log('Por favor, insira um ID válido.');
      return;
    }
  
    fetch(`http://localhost:8080/vendas/${id}`)
      .then(resposta => resposta.json())
      .then(venda => {
        if (venda){

            const header = document.querySelector("#header_venda");
            const tabela = document.querySelector("#tabela_vendas");
    
          
            tabela.innerHTML = '';
            header.innerHTML = ''; 
    
            document.querySelector('.listar_vendas').style.display = 'none';
            document.querySelector('.deslistar_vendas').style.display = 'block';
    
            header.innerHTML =
        ` 
            <td>ID</td>
            <td>Data</td>
            <td>Nome departamento</td>
            <td>Nome do vendedor</td>
            <td>Nome Produto</td>
            <td>Nome Cliente</td>
            <td>Quantidade</td>
            <td>Valor total</td>
            <td>Tipo de pagamento</td>
            <td>Ações</td>
        `
        const formId = venda.id

        tabela.innerHTML += `
            <tr class="linha_tabela">
              <td>
                  <input type="number" name="id" value="${venda.id}" readonly>
              </td>
              <td>
                <input type="date" name="data" id="data_${venda.id}" value="${venda.data}" form="${formId}">
              </td>
              <td>
                <div>${venda.produto.departamento.nome}</div>
              </td>
              <td>
                <div> ${venda.produto.departamento.usuario.nome} </div>
              </td>
              <td>
                <div> ${venda.produto.nome} </div>
              </td>
              <td>
                <div>${venda.usuario.nome} </div>
                <input type="hidden" name="cliente_id" id="cliente_id_${venda.id}" value="${venda.usuario.id}">
                <input type="hidden" name="produto_id" id="produto_id_${venda.id}" value="${venda.produto.id}">
              </td>
              <td>
                <input type="number" name="quantidade" id="quantidade_${venda.id}" value="${venda.quantidade}">
              </td>
              <td>
                <input type="number" name="valorTotal" id="valorTotal_${venda.id}" value="${venda.valorTotal}">
              </td>
              <td>
                <input type="text" name="tipoPagamento" id="tipoPagamento_${venda.id}" value="${venda.tipoPagamento}">
              </td>
              <td>
                <form id="${formId}" onsubmit="event.preventDefault(); editar_venda('${venda.id}', '${formId}')">
                    <button type="submit" class="btn">Editar</button>
                    <button type="button" class="btn" onclick="deletar_venda(${venda.id})">Deletar</button>
                </form>
              </td>
            </tr>
          `
        } else {
            header.innerHTML = `<div class="nenhum">Nenhuma Venda cadastrado</div>`;
          }
    
    })
    .catch(erro => {
          alert('Erro ao buscar venda ou venda não existe');
    });
}