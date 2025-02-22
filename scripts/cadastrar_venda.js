document.querySelector("#form_cadastrar_venda").addEventListener("submit", cadastrar)

function cadastrar(event){
    
    event.preventDefault();
    const formulario = new FormData(event.target)

     venda = {
            "data" : formulario.get("data"),
            "quantidade" :formulario.get("quantidade"),
            "valor" : formulario.get("valor"),
            "pontos_cashback" : formulario.get("pontos_cashback"),
            "usuario" : {"id" : formulario.get("usuario")},
            "produto" : {"id" : formulario.get("produto") },
            "pagamento" : {
                "valorReais" : formulario.get("valor_reais"),
                "valorPontos": formulario.get("valor_pontos"),
                "tipoPagamento" : formulario.get("status")
            }}

    fetch('http://localhost:8080/vendas',{
        method: "POST",
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(venda)})
        .then(resposta => {
            if (!resposta.ok) {
              throw new Error('Erro ao cadastrar Venda');
            }
            return resposta.json();})
        .catch(err => console.error(err));

        window.location.href = "/telas/telas_adm/area_adm.html";

}