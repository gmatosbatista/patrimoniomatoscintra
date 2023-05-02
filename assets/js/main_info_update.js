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

// Botões para filtrar valores
const filterCurrentMonthButton = document.getElementById('filter-current-month');
const filterCurrentYearButton = document.getElementById('filter-current-year');
const filterDateRangeButton = document.getElementById('filter-date-range');

filterCurrentMonthButton.addEventListener('click', () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  startDate.setDate(1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  endDate.setDate(endDate.getDate());
  const formattedStartDate = startDate.toISOString().slice(0, 10);
  const formattedEndDate = endDate.toISOString().slice(0, 10);
  console.log(formattedStartDate);
  console.log(formattedEndDate);
  updateBalanceCaixaTable(formattedStartDate, formattedEndDate);
});


filterCurrentYearButton.addEventListener('click', () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  console.log(startDate);
  console.log(endDate);
  updateBalanceCaixaTable(startDate, endDate);
});

//Botão de range de datas
$(document).ready(function() {
  $('.input-daterange').datepicker({
    autoclose: true,
    format: 'yyyy-mm-dd',
    orientation: 'bottom',
  });

  $('#filter-date-range').on('click', function() {
    const startDate = new Date($('input[name="start"]').val());
    const endDate = new Date($('input[name="end"]').val());
    console.log(startDate)
    console.log(endDate)
    updateBalanceCaixaTable(startDate, endDate);
  });
});



window.addEventListener('load', updateAccountSummary);