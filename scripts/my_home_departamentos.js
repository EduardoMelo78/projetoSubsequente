listar_img_departamentos()
function listar_img_departamentos() {
    fetch('http://localhost:8080/departamentos')
      .then(resposta => resposta.json())
      .then(departamentos => {

        const img = document.querySelector("#imgs_departamento");

        if(departamentos.length >0){
            img.innerHTML = ''
            departamentos.forEach(departamento => {
                
                img.innerHTML += 
                  `                  
                  <a href="departamentos.html"><img src="${departamento.logo}"></img></a>
                  `
                })

            }else{
                img.innerHTML = `<div> Nenhum departamento cadastrado</div>\n`
        }
       
      })
      .then(() => console.log.ok)
      .catch(err => console.log(err));
}

listar_departamentos()
function listar_departamentos() {
    fetch('http://localhost:8080/departamentos')
      .then(resposta => resposta.json())
      .then(departamentos => {

        const desc = document.querySelector("#desc_departamento");
        desc.innerHTML = ''; 

        if(departamentos.length >0){

            departamentos.forEach(departamento => {

                desc.innerHTML += `
                <div class="um_departamento">
                  <div class="div_img"><img src="${departamento.logo}"></img></div>
                  <div class= "nome_desc_departamento">
                    <a href = "produtos.html">
                    <div><h2>${departamento.nome}</h2> </div>
                    <div>${departamento.descricao}</div>
                  </div>
                  </a>
              </div>
                  `
                })

            }else{
                img.innerHTML = `<div> Nenhum departamento cadastrado</div>\n`
        }
       
      })
      .then(() => console.log.ok)
      .catch(err => console.log(err));
}
