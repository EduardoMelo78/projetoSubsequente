document.querySelector(".logout").addEventListener('click', deslogar);
function deslogar(){
    localStorage.removeItem("usuarioLogado")
    window.location.href = "login.html"
}

/*const pesquisar = document.getElementById("pesquisar").value
      console.log(pesquisar)*/



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

        let prod = produto;
        const formId = produto.id

          tabela.innerHTML += `
            <tr class="linha_tabela">
              <td>
                  <input type="number" name="id" value="${produto.id}" readonly form="${formId}">
              </td>
              <td>
                <input type="text" name="nome" id="nome" value="${produto.nome}" form="${formId}">
              </td>
              <td>
                <input type="number" name="valor" id="valor" value="${produto.valor}" form="${formId}">
              </td>
              <td>
                <input type="text" name="descricao" id="descricao" value="${produto.descricao}" form="${formId}">
              </td>
              <td>
                <input type="number" name="estoque" id="estoque" value="${produto.estoque}" form="${formId}">
              </td>
              <td>
                <div> ${produto.departamento.whatsapp} </div>
              </td>
              <td>
                <img src="${produto.foto}">
              </td>
              <td>
                ${produto.departamento.nome}
              </td>
              <td>
                <form id="${formId}" onsubmit="event.preventDefault(); editarProduto(${produto.id}, this)">
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

function editarProduto(id, form) {
  const formData = new FormData(form);

  fetch(`http://localhost:8080/produtos/${id}`, {
    method: 'PUT', // Ou 'PATCH' dependendo da sua API
    body: JSON.stringify(formData),
  })
  .then(resposta => {
    if (resposta.ok) {
      alert('Produto atualizado com sucesso!');
      listarProdutos(); // Atualiza a lista de produtos
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
    console.log('Produto deletado com sucesso!');}
})
.then(() => listar_produtos())
}

function deslistar_produtos(){
    document.querySelector("#header_produto").innerHTML = '';
    document.querySelector("#tabela_produtos").innerHTML = '';

    
    document.querySelector('.listar_produtos').style.display = 'block';
    document.querySelector('.deslistar_produtos').style.display = 'none';
}

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

        let vend = venda;
        console.log(venda.quantidade)
        const formId = venda.id

          tabela.innerHTML += `
            <tr class="linha_tabela">
              <td>
                  <input type="hidden" name="id" value="${venda.id}" form="${formId}">
                  <input type="number" name="id" value="${venda.id}" readonly>
              </td>
              <td>
                <input type="date" name="data" id="data" value="${venda.data}" form="${formId}">
              </td>
              <td>
                <input type="text" name="nome_departamento" id="nome_departamento" value="${venda.produto.departamento.nome}" form="${formId}">
              </td>
              <td>
                <input type="text" name="nome_vendedor" id="nome_vendedor" value="${venda.produto.departamento.usuario.nome}" form="${formId}">
              </td>
              <td>
                <input type="text" name="nome_produto" id="nome_produto" value="${venda.produto.nome}" accept="image/*" form="${formId}">
              </td>
              <td>
                <input type="number" name="quantidade" id="quantidade" value="${venda.quantidade}" form="${formId}">
              </td>
              <td>
                <input type="number" name="valorTotal" id="valorTotal" value="${venda.valorTotal}" form="${formId}">
              </td>
              <td>
                <input type="text" name="tipoPagamento" id="tipoPagamento" value="${venda.tipoPagamento}" form="${formId}">
              </td>
              <td>
                <form id="${formId}">
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


/*-------------------USUARIOS -----------------------------------*/ 

