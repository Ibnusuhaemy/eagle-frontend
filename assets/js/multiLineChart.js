$(document).ready(function () {
  const initializeChart = (canvasId, labels, data, format, gridY = true) => {
    const formatValue = (value) => {
      switch (format) {
        case "K":
          return "$" + (value / 1000).toFixed(1) + "K";
        case "M":
          return "$" + (value / 1000000).toFixed(1) + "M";
        case "%":
          return (value * 1).toFixed(2) + "%";
        default:
          return "$" + value;
      }
    };

    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: data.labelIncome,
            data: data.income,
            borderColor: "#4474FD",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointBackgroundColor: "#FFF",
            pointBorderColor: "#4474FD",
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
          },
          {
            label: data.labelAccounts,
            data: data.bankAccounts,
            borderColor: "#19DFAA",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointBackgroundColor: "#FFF",
            pointBorderColor: "#19DFAA",
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            color: "#2A3547",
            ticks: {
              callback: function (value) {
                return formatValue(value);
              },
            },
            grid: {
              display: gridY,
            },
            border: {
              display: false,
              dash: function (context) {
                if (context.tick.value === 0) {
                  return [5, 5];
                }
              },
              borderDashOffset: 0,
            },
          },
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              padding: 10,
              font: {
                size: 12,
              },
              callback: function () {
                return "";
              },
            },
          },
        },
      },
      plugins: [
        {
          id: "wrapLabels",
          afterDraw: function (chart) {
            const xAxis = chart.scales.x;
            const lineHeight = 20;
            chart.ctx.save();
            chart.ctx.textAlign = "center";
            chart.ctx.fillStyle = "#2A3547";
            chart.ctx.textBaseline = "middle";

            chart.data.labels.forEach((label, index) => {
              const labelX = xAxis.getPixelForTick(index);
              const words = label.split(" ");
              chart.ctx.font = "10px Arial";

              words.forEach((word, i) => {
                chart.ctx.fillText(
                  word,
                  labelX,
                  chart.height -
                    (words.length - 1 - i) * lineHeight -
                    lineHeight / 2
                );
              });
            });

            chart.ctx.restore();
          },
        },
      ],
      responsive: true,
      maintainAspectRatio: false,
    });
  };

  // Example data
  const chartData1 = {
    labels: [
      "Jn 23",
      "Jl 23",
      "Au 23",
      "Sp 23",
      "Oc 23",
      "No 23",
      "De 23",
      "Ja 24",
      "Fe 24",
      "Ma 24",
      "Ap 24",
      "My 24",
      "Jn 24",
    ],
    data: {
      labelIncome: "Income",
      income: [
        300000, 400000, 500000, 600000, 800000, 1000000, 1300000, 1500000,
        1400000, 1200000, 1000000, 1700000, 1600000,
      ],
      labelAccounts: "Bank Accounts",
      bankAccounts: [
        200000, 300000, 350000, 500000, 400000, 300000, 600000, 700000, 800000,
        600000, 500000, 700000, 900000,
      ],
    },
  };

  const chartData2 = {
    labels: [
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
      "May 2024",
      "Jun 2024",
    ],
    data: {
      labelIncome: "Line 1",
      income: [0.4, 0.5, 0.55, 0.6, 0.65, 0.7],
      labelAccounts: "Line 2",
      bankAccounts: [0.3, 0.45, 0.35, 0.5, 0.4, 0.6],
    },
  };

  const chartData3 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: {
      labelIncome: "Line 1",
      income: [100000, 200000, 800000, 180000, 430000, 678000],
      labelAccounts: "Line 2",
      bankAccounts: [0, 150000, 400000, 210000, 670000, 100000],
    },
    gridY: false,
  };

  // Initialize multiple charts
  initializeChart("historicChart", chartData1.labels, chartData1.data, "M");
  initializeChart("ratiosChart", chartData2.labels, chartData2.data, "%");
  initializeChart("ratiosChart2", chartData2.labels, chartData2.data, "%");


  // Financial Data
  initializeChart("financialData1", chartData3.labels, chartData3.data, "K", chartData3.gridY);
  initializeChart("financialData2", chartData3.labels, chartData3.data, "K", chartData3.gridY);
  initializeChart("financialData3", chartData3.labels, chartData3.data, "K", chartData3.gridY);
  initializeChart("financialData4", chartData3.labels, chartData3.data, "K", chartData3.gridY);
  initializeChart("financialData5", chartData3.labels, chartData3.data, "K", chartData3.gridY);
  initializeChart("financialData6", chartData3.labels, chartData3.data, "K", chartData3.gridY);
  initializeChart("financialData7", chartData3.labels, chartData3.data, "K", chartData3.gridY);
});
