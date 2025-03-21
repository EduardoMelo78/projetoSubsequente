let fileInput = document.getElementById('foto'); // Substitua 'logo' pelo ID do seu input

fileInput.addEventListener('change', function(event) {
  const arquivo = event.target.files[0];

  if (arquivo) {
    const reader = new FileReader();

    reader.onload = function(event) {
      let imagemBase64 = event.target.result;
      console.log("Imagem em Base64:", imagemBase64);
      fileInput = imagemBase64;
      // Aqui você tem a string Base64 da imagem.  Pode enviá-la para o servidor ou fazer o que precisar.
    }

    reader.readAsDataURL(arquivo);
  }
});

document.querySelector("#form_cadastrar").addEventListener("submit", cadastrar)

function cadastrar(event){
    
    event.preventDefault();
    const formulario = new FormData(event.target)

     produto = {
      "nome" : formulario.get("nome"),
      "descricao" : formulario.get("descricao"),
      "valor" : formulario.get("valor"),
      "cashback" : formulario.get("cashback"),
      "foto" :   fileInput,
      "estoque" :formulario.get("estoque"),
      "data_cadastro" :formulario.get("data_cadastro"),
      "departamento" :{"id" : formulario.get("departamento")}}

    fetch('http://localhost:8080/produtos',{
        method: "POST",
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(produto)})
        .then(resposta => {
            if (!resposta.ok) {
              throw new Error('Erro ao cadastrar produto');
            }
            return resposta.json();})
        .catch(err => console.error(err));

        window.location.href = "/telas/telas_adm/area_adm.html";

}