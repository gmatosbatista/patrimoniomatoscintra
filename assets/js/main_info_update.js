function updateAccountSummary() {
  console.log('updateAccountSummary() called');

  // Selecionar os elementos que serão atualizados
  const patrimonioElement = document.getElementById('total_all_accounts');
  const investimentosElement = document.getElementById('total_investimentos');
  const previdenciaElement = document.getElementById('total_previdencia');

  // Executar a consulta ao servidor para buscar o total Balance do Toshl"
  fetch('https://gestaopatrimonio.herokuapp.com/api/accounts_summary')
    .then(response => response.json())
    .then(data => {
      
      // Arredondar o valor para 0 casas decimais e formatar em Reais
      const patrimonio = (parseFloat(data.total_all_accounts)/1000).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) + "k";
      const investimentos = (parseFloat(data.total_investimentos)/1000).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) + "k";
      const previdencia = (parseFloat(data.total_previdencia)/1000).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) + "k";

      // Atualizar os elementos HTML com os valores arredondados e formatados em Reais
      patrimonioElement.textContent = patrimonio;
      investimentosElement.textContent = investimentos;
      previdenciaElement.textContent = previdencia;
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', updateAccountSummary);