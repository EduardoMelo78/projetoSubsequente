const usuarioLogado = localStorage.getItem("usuarioLogado")
let usuario = JSON.parse(usuarioLogado)

obterdados();


function obterdados(){

  fetch('http://localhost:8080/vendas')
  .then(resposta => resposta.json())
  .then(vendas => {
    const divHtml = document.querySelector("#box_venda")

    divHtml.innerHTML = ``

    vendas.map(venda => {
  
        if(venda.usuario.id == usuario.id){

            divHtml.innerHTML +=

        `<div class = "venda">

         <div class = "mini_box">
         <div><span class = "p">Id: </span>${venda.id}</div>
         <div><span class = "p">Data: </span> ${venda.data}</div>
         </div>

         <div class = "mini_box">
          <div><span class = "p">Nome Produto: </span> ${venda.produto.nome}</div>
          <div><span class = "p">Quantidade: </span>${venda.quantidade} </div>
         </div>

         <div class = "mini_box">
          <div><span class = "p">Valor Total: </span> ${venda.valorTotal} </div>
          <div><span class = "p">Tipo de Pagamento: </span> ${venda.tipoPagamento}</div>
         </div>

         <div class = "mini_box">
          <div><span class = "p">Departamento: </span> ${venda.produto.departamento.nome}</div>
         </div>

         </div>
         `
        }
    })
  })
  .catch(err => console.log(err))

}
