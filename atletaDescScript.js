document.addEventListener('DOMContentLoaded', function() {

  if (!sessionStorage.getItem('logado')){
    alert('Faça login antes de acessar a pagina');
    window.location.href = './index.html';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if(id<1 || id>60){
    temp = document.getElementById('container');
    temp.innerHTML = '';

    const mensagemErro = document.createElement('h1');
    mensagemErro.textContent = 'ID inválido';
    mensagemErro.className = 'mensagemErro';
  
    temp.appendChild(mensagemErro);
    return;
  }

  fetch("https://botafogo-atletas.mange.li/" + id)
    .then(response => response.json())
    .then(data => {
      const jogadorInfoContainer = document.getElementById('infoContainer');
      jogadorInfoContainer.innerHTML = `
        <img src="${data.imagem}" alt="${data.nome}">
        <h2>${data.nome}</h2>
        <p> ${data.descricao}</p>
        <p><strong>Posição:</strong> ${data.posicao}</p>
        <p><strong>Nome completo:</strong> ${data.nome_completo}</p>
        <p><strong>Nascimento:</strong> ${data.nascimento}</p>
        <p><strong>Altura:</strong> ${data.altura}m</p>
      `;
    })
    .catch(error => console.log('Erro ao pegar data ', error));
});

function voltar(){
  window.location.href = './principal.html';
}