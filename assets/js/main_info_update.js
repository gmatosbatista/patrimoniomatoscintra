function update_main_info_toshl() {
  console.log('update_main_info_toshl() called');
  
  // Selecionar o elemento que será atualizado
  const total_all_accountsElement = document.getElementById('total_all_accounts');

  // Executar a consulta SQL para somar a coluna "balance" na tabela "toshl_accounts"
  fetch('https://gestaopatrimonio.herokuapp.com/api/sql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'SELECT SUM(balance) AS total_all_accounts FROM toshl_accounts' })
  })
    .then(response => response.json())
    .then(data => {
      const total_all_accounts = data[0].total_all_accounts;
      total_all_accountsElement.textContent = total_all_accounts.toFixed(2);
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', update_main_info_toshl);