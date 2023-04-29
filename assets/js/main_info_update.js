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

// Botões para filtrar valores
const filterCurrentMonthButton = document.getElementById('filter-current-month');
const filterCurrentYearButton = document.getElementById('filter-current-year');
const filterDateRangeButton = document.getElementById('filter-date-range');

filterCurrentMonthButton.addEventListener('click', () => {
  const startDate = new Date();
  startDate.setDate(1);
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0);
  updateBalanceCaixaTable(startDate, endDate);
});

filterCurrentYearButton.addEventListener('click', () => {
  const startDate = new Date();
  startDate.setMonth(0);
  startDate.setDate(1);
  const endDate = new Date();
  updateBalanceCaixaTable(startDate, endDate);
});

filterDateRangeButton.addEventListener('click', () => {
  const startDate = new Date(prompt("Insira a data de início (YYYY-MM-DD)"));
  const endDate = new Date(prompt("Insira a data de término (YYYY-MM-DD)"));
  updateBalanceCaixaTable(startDate, endDate);
});

function updateBalanceCaixaTable(startDate, endDate) {
  fetch('https://gestaopatrimonio.herokuapp.com/api/balance_caixa')
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(item => {
        const date = new Date(item.transaction_date);
        return date >= startDate && date <= endDate;
      });

      let totalBalanceCaixa = 0;
      for (let item of filteredData) {
        totalBalanceCaixa += item.balance_caixa;
      }

      const balanceCaixaElement = document.getElementById('balance_caixa');
      balanceCaixaElement.innerHTML = `R$ ${totalBalanceCaixa.toFixed(2)}`;
    });
}

// Função para meu filtro de datas
$(document).ready(function(){
  $('#filter-date-range').on('click', function() {
    $('#date-range-picker').datepicker('show');
  });
});

window.addEventListener('load', updateAccountSummary);