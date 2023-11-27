async function fetchPlayersData(caminho) {
  try {
    return (await fetch(caminho)).json();
  } catch (error) {
    gerarMensagemErro();
    console.error('Erro em pegar os dados', error);
    return [];
  }
}

function criarCartao(player) {
  const cartao = document.createElement('div');
  cartao.classList.add('cartaoJogador');

  const name = document.createElement('h2');
  name.textContent = player.nome;
  cartao.appendChild(name);

  const imagem = document.createElement('img');
  imagem.src = player.imagem;
  imagem.alt = player.nome;
  cartao.appendChild(imagem);

  const posicao = document.createElement('p');
  posicao.textContent = player.posicao;
  cartao.appendChild(posicao);

  const botaoDetalhes = document.createElement('button');
  botaoDetalhes.textContent = 'Ver detalhes';
  botaoDetalhes.className = 'botaoSaibaMais';
  botaoDetalhes.addEventListener('click', () => {
    window.location.href = `./atletaDesc.html?id=${player.id}`;
  });
  cartao.appendChild(botaoDetalhes);

  return cartao;
}

function gerarMensagemErro(){
  alert('Erro ao pegar informação dos jogadores');
}

async function renderCartoes(elenco) {
  const jogadoresContainer = document.getElementById('jogadoresContainer');
  jogadoresContainer.innerHTML = "";

  link = "https://botafogo-atletas.mange.li/" + elenco;

  const jogadoresData = await fetchPlayersData(link);
  
  if (jogadoresData.length === 0){
    gerarMensagemErro();
    return;
  }

  jogadoresData.forEach(player => {
    const cartao = criarCartao(player);
    jogadoresContainer.appendChild(cartao);
  });
}

const sair = () => {
  sessionStorage.removeItem('logado');
  window.location.href = './index.html';
}

if (!sessionStorage.getItem('logado')){
  alert('Faça login antes de acessar a pagina');
  window.location.href = './index.html';
}
