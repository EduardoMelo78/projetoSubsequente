obterdados();


function obterdados(){

    fetch('http://localhost:8080/pagamentos')
  .then(resposta => resposta.json())
  .then(pagamentos => {
    const tabelaHtml = document.querySelector("#tabela")

    tabelaHtml.innerHTML = ``

    pagamentos.map(pagamento => {
        tabelaHtml.innerHTML +=
        `
        <tr>
            <td>${pagamento.tipoPagamento}</td>
            <td>${pagamento.valorReais}</td>
            <td>${pagamento.valorPontos}</td>
        </tr>`
        
    })
  })
  .catch(err => console.log(err))

}

document.querySelector("#addPagamento").addEventListener("submit", salvar)

function salvar(event){

    event.preventDefault()

    const formulario = new FormData(event.target)

    pagamento = {
        "tipoPagamento": formulario.get("tipoPagamento"),
        "valorReais": formulario.get("valorReais"),
        "valorPontos": formulario.get("valorPontos")
    }

        fetch('http://localhost:8080/pagamentos',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(pagamento)})
            .then( resposta => {
            console.log('resposta do Servidor:', resposta);
            if(resposta.ok)
                obterdados()
})
.catch(err => console.log(err))
}


