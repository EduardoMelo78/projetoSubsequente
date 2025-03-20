listar_produtos()
function listar_produtos() {
    fetch('http://localhost:8080/produtos')
      .then(resposta => resposta.json())
      .then(produtos => {

        const desc = document.querySelector("#desc_produto");
        desc.innerHTML = ''; 

        if(produtos.length >0){

            produtos.forEach(produto => {

                desc.innerHTML += `
                <div class="um_produto">
                  <a href="${produto.departamento.whatsapp}">
                    <div class="div_img"><img src="${produto.foto}"></div>

                    <div class="nome_desc_departamento">
                      <h2>${produto.nome}</h2>
                      <h4>${produto.departamento.nome}</h4>
                      <div>R$ ${produto.valor}</div>
                    </div>
                    <div class="descricao">${produto.descricao}</div>
                  </a>
                </div>
                  `
                })

            }else{
                img.innerHTML = `<div> Nenhum produto Encontrado</div>\n`
        }
       
      })
      .then(() => console.log.ok)
      .catch(err => console.log(err));
}