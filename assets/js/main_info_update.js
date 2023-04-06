function update_main_info_toshl() {
  console.log('update_main_info_toshl() called');
  
  // Selecionar o elemento que será atualizado
  const total_all_accountsElement = document.getElementById('total_all_accounts');

  // Executar a consulta SQL para somar a coluna "balance" na tabela "toshl_accounts"
  fetch('/api/sql', {
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
  
    // Permitir solicitações de todas as origens
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

window.addEventListener('load', update_main_info_toshl);