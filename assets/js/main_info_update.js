function patrimonio_total() {
  console.log('patrimonio_total() called');
  
  // Selecionar o elemento que será atualizado
  const patrimonioElement = document.getElementById('patrimonio_total');

  // Executar a consulta ao servidor para buscar o total Balance do Toshl"
  fetch('https://gestaopatrimonio.herokuapp.com/api/patrimonio_total')
    .then(response => response.json())
    .then(data => {
      // Arredondar o valor para 2 casas decimais
      const patrimonio = parseFloat(data.total_all_accounts).toFixed(0);

      // Atualizar o elemento HTML com o valor arredondado
      patrimonioElement.textContent = patrimonio;
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', patrimonio_total);