function total_all_accounts() {
  console.log('total_all_accounts() called');
  
  // Selecionar o elemento que será atualizado
  const patrimonioElement = document.getElementById('total_all_accounts');

// Executar a consulta ao servidor para buscar o total Balance do Toshl"
fetch('https://gestaopatrimonio.herokuapp.com/api/total_all_accounts')
  .then(response => response.json())
  .then(data => {
    // Arredondar o valor para 2 casas decimais e formatar em Reais
    const patrimonio = parseFloat(data.total_all_accounts).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    // Atualizar o elemento HTML com o valor arredondado e formatado em Reais
    patrimonioElement.textContent = patrimonio;
  })
  .catch(error => console.error(error));
}

window.addEventListener('load', total_all_accounts);