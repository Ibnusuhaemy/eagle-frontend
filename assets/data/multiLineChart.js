$(document).ready(function () {
  const allCharts = [];
  const bgColor = [
    "#4474FD",
    "#19DFAA",
    "#7DD5F9",
    "#FDB43A",
    "#F73A5C",
    "#FF6F61",
    "#6B8E23",
    "#FFD700",
    "#00CED1",
    "#FF4500",
    "#ADFF2F",
    "#FF1493",
    "#4B0082",
    "#FF6347",
    "#3CB371",
    "#8A2BE2",
  ];

  const initializeChart = (
    canvasId,
    labels,
    data,
    format,
    gridY = true,
    linkLegend = false
  ) => {
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

    const datasets = data.map((item, index) => ({
      label: item.label,
      data: item.data,
      borderColor: bgColor[index],
      backgroundColor: "transparent",
      borderWidth: 2,
      pointBackgroundColor: "#FFF",
      pointBorderColor: bgColor[index],
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.4,
    }));

    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        plugins: {
          legend: {
            display: false, // Hide default legend
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

    if (linkLegend) {
      allCharts.push(chart);
    }
  };

  function toggleDatasetVisibility(datasetIndex) {
    allCharts.forEach((chart) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.hidden =
        meta.hidden === null ? !chart.data.datasets[datasetIndex].hidden : null;
      chart.update();
    });
  }

  function createLegend() {
    const legendContainer = document.getElementById("chart_legend");
    legendContainer.innerHTML = ""; // Clear any existing content
    const legendItems = [];

    allCharts[0].data.datasets.forEach((dataset, index) => {
      const legendItem = document.createElement("div");
      legendItem.innerHTML = `<div class="d-flex align-items-center"><div class="label-color" style="background-color: ${dataset.borderColor};"></div><span class="label-text"> ${dataset.label}</span></div>`;
      legendItem.style.cursor = "pointer";
      legendItem.onclick = () => toggleDatasetVisibility(index);
      legendItems.push(legendItem);
      legendContainer.appendChild(legendItem);
    });
  }

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
    data: [
      {
        label: "Income",
        data: [
          300000, 400000, 500000, 600000, 800000, 1000000, 1300000, 1500000,
          1400000, 1200000, 1000000, 1700000, 1600000,
        ],
      },
      {
        label: "Bank Accounts",
        data: [
          200000, 300000, 350000, 500000, 400000, 300000, 600000, 700000,
          800000, 600000, 500000, 700000, 900000,
        ],
      },
    ],
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
    data: [
      {
        label: "Income",
        data: [0.4, 0.5, 0.55, 0.6, 0.65, 0.7],
      },
      {
        label: "Bank Accounts",
        data: [0.3, 0.45, 0.35, 0.5, 0.4, 0.6],
      },
    ],
  };

  const chartData3 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [
      {
        label: "This Year Revenue",
        data: [100000, 200000, 800000, 180000, 430000, 678000],
      },
      {
        label: "Last Year Revenue",
        data: [0, 150000, 400000, 210000, 670000, 100000],
      },
    ],
  };

  const chartData4 = {
    labels: [
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
      "May 2024",
      "Jun 2024",
    ],
    data: [
      {
        label: "Total Income",
        data: [40000, 60000, 70000, 80000, 75000, 95000],
      },
      {
        label: "Total Cost of Goods Sold",
        data: [65000, 60000, 70000, 75000, 90000, 100000],
      },
    ],
  };

  // Initialize multiple charts
  initializeChart(
    "historicChart",
    chartData1.labels,
    chartData1.data,
    "M",
    true,
    true
  );
  initializeChart("ratiosChart", chartData2.labels, chartData2.data, "%");
  initializeChart("ratiosChart2", chartData2.labels, chartData2.data, "%");
  initializeChart("ratiosChart3", chartData2.labels, chartData2.data, "%");

  // Financial Data
  initializeChart(
    "financialData1",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "financialData2",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "financialData3",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "financialData4",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "financialData5",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "financialData6",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "financialData7",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );

  // Compare Data
  initializeChart(
    "totalSalesCompare",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "totalCostCompare",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "grossProfitCompare",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "totalExpensesCompare",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "netProfitCompare",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );
  initializeChart(
    "bankTotalCompare",
    chartData3.labels,
    chartData3.data,
    "K",
    false,
    true
  );

  initializeChart(
    "incomeCostAnalysis",
    chartData4.labels,
    chartData4.data,
    "K",
    false,
    true
  );

  // Create single legend
  createLegend();
});
