$(document).ready(function () {
  const canvas = document.getElementById("breakevenChart");
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");

  const data = {
    labels: ["$0", "$200K", "$400K", "$600K", "$800K"],
    datasets: [
      {
        label: "Revenue",
        data: [0, 200000, 400000, 600000, 800000],
        borderColor: "#539BFF",
        backgroundColor: "#539BFF",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#539BFF",
        pointRadius: function (context) {
          const index = context.dataIndex;
          return [1, 3].includes(index) ? 5 : 0;
        },
      },
      {
        label: "Variable Costs",
        data: [170210, 200000, 229790, 259580, 289370],
        borderColor: "#FFAE1F",
        backgroundColor: "#FFAE1F",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#FFAE1F",
        pointRadius: function (context) {
          const index = context.dataIndex;
          return [1, 3].includes(index) ? 5 : 0;
        },
      },
      {
        label: "Fixed Costs",
        data: [170210, 170210, 170210, 170210, 170210],
        borderColor: "#5A6A85",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#5A6A85",
        pointBorderColor: "#5A6A85",
        pointRadius: 0,
      },
      {
        label: "Triangle Area",
        data: [null, 200000, 400000, 600000, null],
        backgroundColor: "rgba(81, 138, 242, 0.2)",
        borderColor: "transparent",
        pointRadius: 0,
        fill: "-2",
        order: 1,
      },
      {
        label: "Margin Area",
        data: [170210, 170210, 170210, 170210, 170210],
        backgroundColor: "rgba(217, 217, 217, 0.25)",
        borderColor: "transparent",
        pointRadius: 0,
        fill: "origin",
        order: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          color: "#EAEFF4",
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#7C8FAC",
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
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
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Initially hide the default legend
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });

  function createLegend() {
    const legendContainer = document.getElementById("chart_legend_breakeven");
    legendContainer.innerHTML = ""; // Clear any existing content
    const legendItems = [];

    data.datasets.forEach((dataset, index) => {
      if (
        dataset.label !== "Revenue" &&
        dataset.label !== "Variable Costs" &&
        dataset.label !== "Fixed Costs"
      ) {
        return;
      }
      const legendItem = document.createElement("div");
      legendItem.innerHTML = `<div class="d-flex align-items-center"><div class="label-color" style="background-color: ${dataset.borderColor};"></div><span class="label-text"> ${dataset.label}</span></div>`;
      legendItem.style.cursor = "pointer";
      legendItem.onclick = () => {
        const meta = chart.getDatasetMeta(index);
        meta.hidden =
          meta.hidden === null ? !chart.data.datasets[index].hidden : null;
        chart.update();
      };
      legendItems.push(legendItem);
      legendContainer.appendChild(legendItem);
    });
  }

  // Create the custom legend
  createLegend();
});
