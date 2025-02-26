let fileInput = document.getElementById('logo'); // Substitua 'logo' pelo ID do seu input

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

document.querySelector("#form_cadastrar_departamento").addEventListener("submit", cadastrar)

function cadastrar(event){
    
    event.preventDefault();
    const formulario = new FormData(event.target)

     departamento = {
      "nome" : formulario.get("nome"),
      "descricao" : formulario.get("descricao"),
      "whatsapp" : formulario.get("whatsapp"),
      "logo" : fileInput,
      "usuario" :{"id" : formulario.get("usuario")}}

    fetch('http://localhost:8080/departamentos',{
        method: "POST",
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(departamento)})
        .then(resposta => {
            if (!resposta.ok) {
              throw new Error('Erro ao cadastrar Departamento');
            }
            return resposta.json();})
        .then(window.location.href = "/telas/telas_adm/area_adm.html")
        .catch(err => console.error(err));

        

}