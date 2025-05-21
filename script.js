document.getElementById("simForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const type = document.getElementById("motorType").value;
  const power = parseFloat(document.getElementById("power").value);
  const load = parseFloat(document.getElementById("load").value);

  let efficiency, voltage;

  switch(type) {
    case "dc":
      efficiency = 0.85;   // 85%
      voltage = 220;
      break;
    case "synchronous":
      efficiency = 0.90;   // 90%
      voltage = 400;
      break;
    case "asynchronous":
      efficiency = 0.86;   // 86%
      voltage = 400;
      break;
    default:
      efficiency = 0.85;
      voltage = 220;
  }

  const outputPower = (power * (load / 100)) * efficiency;
  const current = (outputPower * 1000) / voltage;

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
