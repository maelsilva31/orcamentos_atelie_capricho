function adicionarServico(){

  let div = document.createElement('div');

  div.classList.add('servico');

  div.innerHTML = `
  
    <input type="text"
    class="descricao"
    placeholder="Descrição do serviço">

    <input type="number"
    class="valor"
    placeholder="Valor">

    <button onclick="removerServico(this)">
      Excluir Serviço
    </button>

  `;

  document.getElementById('servicos')
    .appendChild(div);

}
function calcularTotal(){

  let valores = document.querySelectorAll('.valor');

  let total = 0;

  valores.forEach(campo => {

    let valor = Number(campo.value);

    if(!isNaN(valor)){

      total += valor;

    }

  });

  document.getElementById('total').innerHTML =
    total.toFixed(2);

}

document.addEventListener('input', calcularTotal);

function salvar(){

  let cliente = document.getElementById('cliente').value;

  let entrada = document.getElementById('entrada').value;

  let entrega = document.getElementById('entrega').value;

  let descricoes = document.querySelectorAll('.descricao');

  let valores = document.querySelectorAll('.valor');

  let servicos = [];

  descricoes.forEach((descricao, index) => {

    servicos.push({
      descricao: descricao.value,
      valor: valores[index].value
    });

  });

  let dados = {
    cliente,
    entrada,
    entrega,
    servicos
  };

  let orcamentos =
  JSON.parse(localStorage.getItem('orcamentos')) || [];

orcamentos.push(dados);

localStorage.setItem(
  'orcamentos',
  JSON.stringify(orcamentos)
);

mostrarOrcamentos();

  alert('Orçamento salvo!');
}

function enviarWhats(){

  let cliente = document.getElementById('cliente').value;

  let entrega = document.getElementById('entrega').value;

  let entrada = document.getElementById('entrada').value;

  let descricoes = document.querySelectorAll('.descricao');

  let valores = document.querySelectorAll('.valor');

  let mensagem =
`Olá ${cliente}, tudo bem?😄

Aqui está o orçamento dos serviços que conversamos.

Consertos:
`;

  let valorTotal = 0;

  descricoes.forEach((descricao, index) => {

    let valor = 
      parseFloat(valores[index].value) || 0;

    valorTotal += valor;

    mensagem +=
`* ${descricao.value} - R$ ${valor.toFixed(2)}

`;

  });

  mensagem +=
` VALOR TOTAL: R$ ${valorTotal.toFixed(2)}

📅 Data que deixou: ${entrada}

⏳ Prazo de entrega: ${entrega}

📝 Observação: Valores válidos para os serviços listados.

Retirada somente mediante pagamento.

Atenciosamente,
Rafaela (Ateliê Capricho)

Chave PIX: 4c50ab28-6c06-4195-a625-678b11ec5125 `;

  let link =
`https://wa.me/?text=${encodeURIComponent(mensagem)}`;

  window.open(link);

}

document.addEventListener('input', function(e){

  if(e.target.classList.contains('valor')){

    calcularTotal();

  }

});

function removerServico(botao){

  botao.parentElement.remove();

  calcularTotal();

}