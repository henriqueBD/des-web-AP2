function ChecarSenha() {
    const input = document.getElementById("password").value;
    const senha = 'e7d80ffeefa212b7c5c55700e4f7193e'; //senha123
    const inputMd5 = hex_md5(input);
    if (inputMd5 === senha){
        sessionStorage.setItem('logado', 'true');
        window.location.href = './principal.html';
    } else {
        alert('Senha incorreta. Tente novamente');
    }
}