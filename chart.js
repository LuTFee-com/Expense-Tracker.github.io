let ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['ค่าใช้จ่าย'],
        datasets: [{
            data: [0],
            backgroundColor: ['red']
        }]
    }
});

function updateChart(expenses) {
    expenseChart.data.datasets[0].data = expenses;
    expenseChart.update();
}
