document.getElementById("simForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const type = document.getElementById("motorType").value;
  const power = parseFloat(document.getElementById("power").value);
  const load = parseFloat(document.getElementById("load").value);

  const efficiency = type === "DC" ? 0.85 : 0.92;
  const outputPower = (power * (load / 100)) * efficiency;
  const current = (outputPower * 1000) / (type === "DC" ? 220 : 400);

  const ctx = document.getElementById("resultChart").getContext("2d");
  if (window.chartInstance) window.chartInstance.destroy();

  window.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Putere ieșire (kW)', 'Curent estimat (A)'],
      datasets: [{
        label: 'Valori Simulate',
        data: [outputPower.toFixed(2), current.toFixed(2)],
        backgroundColor: ['#4CAF50', '#2196F3']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

