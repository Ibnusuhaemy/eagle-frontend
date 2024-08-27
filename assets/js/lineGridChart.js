$(document).ready(function () {
  const plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  function getShortMonthNames() {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const today = new Date();
    const result = [];

    for (let i = 0; i < 7; i++) {
      const monthIndex = (today.getMonth() - i + 12) % 12;
      result.unshift(monthNames[monthIndex]);
    }

    return result;
  }

  const bulanTerakhir = getShortMonthNames();

  const createChart = (context, dataChart, format) => {
    const canvas = document.getElementById(context);
    if (!canvas) {
      return;
    }

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

    const contextData = canvas.getContext("2d");

    const data = {
      labels: bulanTerakhir,
      datasets: [
        {
          label: "",
          data: dataChart,
          fill: false,
          borderWidth: 2,
          borderColor: "#539BFF",
          backgroundColor: "#539BFF",
          pointBackgroundColor: "#FFFFFF",
          pointBorderColor: "#539BFF",
          pointRadius: 5,
          tension: 0.4,
        },
      ],
    };

    return new Chart(contextData, {
      type: "line",
      data: data,
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: "lightGreen",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#7C8FAC",
              autoSkip: true, // Skip labels if they are too crowded
              maxRotation: 0, // Prevents rotation of labels
              minRotation: 0,
            },
          },
          y: {
            grid: {
              display: true,
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#7C8FAC",
              beginAtZero: true,
              callback: function (value) {
                return formatValue(value);
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          },
        },
        elements: {
          line: {
            tension: 0.4, // Smooth line curve
          },
        },
      },
      plugin: [plugin],
    });
  };

  // Data chart
  const grossDataProfit = [25, 35, 32, 35, 40, 45];
  const netDataProfit = [60, 50, 50, 50, 70, 75];
  const currentRatio = [10, 15, 12, 17, 23, 30];

  // Create charts with different datasets
  createChart("grossProfitMargin", grossDataProfit, "%");
  createChart("netProfitMargin", netDataProfit, "%");
  createChart("currentRatio", currentRatio, "%");
  createChart("debtToEquity", currentRatio, "%");
  createChart("returnOnAssets", currentRatio, "%");
});
