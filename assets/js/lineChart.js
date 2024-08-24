$(document).ready(function () {
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

  const createChart = (context, dataChart) => {
    const canvas = document.getElementById(context);
    if (!canvas) {
      return;
    }

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
            },
          },
          y: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#7C8FAC",
              beginAtZero: true,
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    });
  };

  // Different datasets for each chart
  const dataChart = [65, 59, 80, 81, 56, 55, 40];

  // const dataChartTotalSales = [65, 59, 80, 81, 56, 55, 40];
  // const dataChartTotalCost = [45, 79, 60, 91, 66, 65, 30];
  // const dataChartGrossProfit = [75, 69, 90, 71, 46, 75, 60];
  // const dataChartTotalExpenses = [55, 49, 70, 61, 86, 85, 50];
  // const dataChartNetProfit = [95, 89, 100, 81, 76, 95, 70];
  // const dataChartBankTotal = [35, 29, 50, 51, 26, 45, 20];
  // const dataChartBurnRate = [85, 79, 90, 101, 86, 75, 90];

  // Create charts with different datasets
  createChart("totalSales", dataChart);
  createChart("totalCost", dataChart);
  createChart("grossProfit", dataChart);
  createChart("totalExpenses", dataChart);
  createChart("netProfit", dataChart);
  createChart("bankTotal", dataChart);

  createChart("burnRate", dataChart);
  createChart("burnRate2", dataChart);
  createChart("burnRate3", dataChart);
});
