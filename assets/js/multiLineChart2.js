const ctx = document.getElementById("multiLineChart").getContext("2d");
const multiLineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
      "May 2024",
      "June 2024",
    ],
    datasets: [
      {
        label: "Total Sales",
        data: [30000, 50000, 40000, 70000, 60000, 90000],
        borderColor: "#6E44FF",
        backgroundColor: "rgba(110, 68, 255, 0.1)",
        fill: false,
        borderWidth: 2,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#6E44FF",
        pointRadius: 5,
        tension: 0.4,
      },
      {
        label: "Total Cost",
        data: [20000, 25000, 30000, 35000, 40000, 45000],
        borderColor: "#23D3D3",
        backgroundColor: "rgba(35, 211, 211, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#23D3D3",
        pointRadius: 5,
      },
      {
        label: "Gross Profit",
        data: [10000, 25000, 10000, 35000, 20000, 45000],
        borderColor: "#3B3B48",
        backgroundColor: "rgba(59, 59, 72, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#3B3B48",
        pointRadius: 5,
      },
      {
        label: "Total Expenses",
        data: [-5000, -10000, 0, 5000, 0, -5000],
        borderColor: "#F4AE00",
        backgroundColor: "rgba(244, 174, 0, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#F4AE00",
        pointRadius: 5,
      },
      {
        label: "Net Profit",
        data: [5000, 15000, 10000, 30000, 20000, 40000],
        borderColor: "#FF4C4C",
        backgroundColor: "rgba(255, 76, 76, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#FF4C4C",
        pointRadius: 5,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#5A6A85",
          font: {
            weight: "600",
          },
          callback: function (value) {
            return "$" + value.toLocaleString();
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
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#5A6A85",
          font: {
            weight: "600",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  },
});
