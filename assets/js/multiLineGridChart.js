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
              display: true,
            },
            border: {
              display: true,
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
        responsive: true,
        maintainAspectRatio: false,
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

  const incomeCostAnalysisData = {
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

  // Compare Data

  initializeChart(
    "incomeCostAnalysis",
    incomeCostAnalysisData.labels,
    incomeCostAnalysisData.data,
    "K",
    false,
    true
  );

  // Create single legend
  createLegend();
});
