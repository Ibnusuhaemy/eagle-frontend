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
              autoSkip: true, // Skip labels if they are too crowded
              maxRotation: 0, // Prevents rotation of labels
              minRotation: 0,
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
            tension: 0.4,
          },
        },
      },
    });
  };

  // Data chart
  const dataChart = [65, 59, 80, 81, 56, 55, 40];
  const balanceData = [
    "$50,000",
    "$40,000",
    "$30,000",
    "$20,000",
    "$10,000",
    "$0",
  ];

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

  createChart("burnRateModal1", dataChart);
  createChart("burnRateModal2", dataChart);
  createChart("cashBalance", balanceData);
});
