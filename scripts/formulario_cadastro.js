function showForm2() {
    document.getElementById('pessoal').style.display = 'none';
    document.getElementById('endereco').style.display = 'flex';
}

function showForm1() {
    document.getElementById('endereco').style.display = 'none';
    document.getElementById('pessoal').style.display = 'flex';
    
}

function cadastrar(){

    /*Após cadastrar o usuario ir para a página de login para autenticar*/
    window.location.href = "login.html";
}
