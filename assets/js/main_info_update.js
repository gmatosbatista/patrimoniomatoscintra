function update_main_info_toshl() {
  console.log('update_main_info_toshl() called');
  
  // Selecionar o elemento que será atualizado
  const total_all_accountsElement = document.getElementById('total_all_accounts');

  // Executar a consulta ao servidor para buscar o total Balance do Toshl"
  fetch('https://gestaopatrimonio.herokuapp.com/api/total_all_accounts')
    .then(response => response.json())
    .then(data => {
      // Arredondar o valor para 2 casas decimais
      const totalBalance = parseFloat(data.total_all_accounts).toFixed(2);

      // Atualizar o elemento HTML com o valor arredondado
      total_all_accountsElement.textContent = totalBalance;
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', update_main_info_toshl);