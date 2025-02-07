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

