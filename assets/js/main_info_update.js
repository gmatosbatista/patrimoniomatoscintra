function update_main_info_toshl() {
  console.log('update_main_info_toshl() called');
  
  // Selecionar o elemento que será atualizado
  const total_all_accountsElement = document.getElementById('total_all_accounts');

// Executar a consulta ao servidor para buscar o total Balance do Toshl"
fetch('https://gestaopatrimonio.herokuapp.com/api/total_all_accounts')
  .then(response => response.json())
  .then(data => {
    const totalBalanceElement = document.getElementById('total_balance');
    totalBalanceElement.textContent = data.total_all_accounts;
  })
  .catch(error => console.error(error));

}

window.addEventListener('load', update_main_info_toshl);