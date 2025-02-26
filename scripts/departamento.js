let fileInput = document.getElementById('novoLogo')

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
})


document.querySelectorAll(".form_departamento").addEventListener("submit", editar_departamento)

function editar_departamento(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
  
    
      const departamentoNovo = {
        id: formData.get("id"),
        nome: formData.get("nome"),
        descricao: formData.get("descricao"),
        whatsapp: formData.get("whatsapp"),
        logo: logoValue,
        usuario: { id: formData.get("usuario")}}
      
  
      fetch(`http://localhost:8080/departamentos/` + departamentoNovo.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(departamentoNovo)
      })
        .then(resposta => {
          if (resposta.ok) {
            console.log('Departamento editado com sucesso!');
            listar_departamento();
          }
        })
        .catch(err => console.log(err));
    }  

function deletar_departamento(id) {
fetch(`http://localhost:8080/departamentos/${id}`, {
    method: 'DELETE'
})
.then(resposta => {
    if (resposta.ok) {
        console.log('Departamento deletado com sucesso!');}
})
.then(() => listar_departamento())
}