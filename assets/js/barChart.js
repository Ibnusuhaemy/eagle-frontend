$(document).ready(function () {
  const bgColor = [
    "#4474FD",
    "#49BEFF",
    "#2A3547",
    "#5A6A85",
    "#0074BA",
    "#BBD7FF",
    "#01C0C8",
    "#B2B1FF",
    "#FA896B",
    "#FF4500",
    "#ADFF2F",
    "#FF1493",
    "#4B0082",
    "#FF6347",
    "#3CB371",
    "#8A2BE2",
  ];

  const createChart = (context, dataChart, labels) => {
    const canvas = document.getElementById(context);

    if (!canvas) {
      return;
    }

    // Make the canvas responsive
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const contextData = canvas.getContext("2d");

    const data = {
      labels: labels,
      datasets: [
        {
          label: "",
          data: dataChart,
          backgroundColor: dataChart.map((item, index) => bgColor[index]),
          borderColor: dataChart.map((item, index) => bgColor[index]),
          borderWidth: 0,
          borderRadius: 2,
        },
      ],
    };

    const chart = new Chart(contextData, {
      type: "bar",
      data: data,
      options: {
        plugins: {
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
          y: {
            border: {
              display: false,
              dash: [2, 4],
            },
            ticks: {
              color: "#7C8FAC",
              callback: function (value) {
                return "$" + value + "K";
              },
            },
            beginAtZero: true,
          },
        },
      },
      plugins: [
        {
          id: "wrapLabels",
          afterDraw: function (chart) {
            const xAxis = chart.scales.x;
            const yOffset = 10;
            chart.ctx.save();
            chart.ctx.textAlign = "center";
            chart.ctx.fillStyle = "#7C8FAC";
            chart.ctx.textBaseline = "middle";
            chart.data.labels.forEach((label, index) => {
              const labelX = xAxis.getPixelForTick(index);
              const labelText = label.split(" ");
              let line = "";
              let lines = [];
              chart.ctx.font = "10px Arial";
              const maxWidth = xAxis.width / chart.data.labels.length;
              for (let i = 0; i < labelText.length; i++) {
                const testLine = line + labelText[i] + " ";
                const metrics = chart.ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && i > 0) {
                  lines.push(line.trim());
                  line = labelText[i] + " ";
                } else {
                  line = testLine;
                }
              }
              lines.push(line.trim());
              lines.forEach((line, i) => {
                chart.ctx.fillText(
                  line,
                  labelX,
                  chart.height - yOffset - (lines.length - 1 - i) * yOffset
                );
              });
            });
            chart.ctx.restore();
          },
        },
      ],
      responsive: true,
      maintainAspectRatio: false, // Ensure the chart adapts to the container's aspect ratio
    });
    return chart;
  };

  // Set Label Data
  const dataLabelRevenue = [
    "Total Income",
    "Total Cost of Goods Sold",
    "Gross Profit",
    "Net Income",
    "Payroll Expenses",
    "Rent & Lease",
    "Meals & Entertainment",
    "Office Supplies & Software",
    "Other Expenses",
  ];

  // Set Data
  const dataRevenue = [250, 200, 150, 170, 80, 60, 40, 70, 10];

  // Create Bar Chart
  createChart("revenueBarChart", dataRevenue, dataLabelRevenue);
});
