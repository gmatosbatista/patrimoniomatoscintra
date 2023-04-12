function patrimonio_total() {
  console.log('patrimonio_total() called');
  
  // Selecionar o elemento que será atualizado
  const patrimonio_totalElement = document.getElementById('patrimonio_total');

  // Executar a consulta ao servidor para buscar o total Balance do Toshl"
  fetch('https://gestaopatrimonio.herokuapp.com/api/patrimonio_total')
    .then(response => response.json())
    .then(data => {
      // Arredondar o valor para 2 casas decimais
      const patrimonio_total = parseFloat(data.patrimonio_total).toFixed(0);

      // Atualizar o elemento HTML com o valor arredondado
      patrimonio_totalElement.textContent = patrimonio_total;
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', patrimonio_total);