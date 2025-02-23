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
         <div><p class = "p">Id: </p>${venda.id}</div>
         <div><p class = "p">Data: </p> ${venda.data}</div>
         </div>

         <div class = "mini_box">
          <div><p class = "p">Nome Produto: </p> ${venda.produto.nome}</div>
          <div><p class = "p">Quantidade: </p>${venda.quantidade} </div>
         </div>

         <div class = "mini_box">
          <div><p class = "p">Valor Total: </p> ${venda.valorTotal} </div>
          <div><p class = "p">Tipo de Pagamento: </p> ${venda.tipoPagamento}</div>
         </div>

         <div class = "mini_box">
          <div><p class = "p">Departamento: </p> ${venda.produto.departamento.nome}</div>
         </div>

         </div>
         `
        }
    })
  })
  .catch(err => console.log(err))

}
