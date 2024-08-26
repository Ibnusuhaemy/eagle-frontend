$(document).ready(function () {
  let checkedValues = [];
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

  const generateRandomData = (length, min, max) => {
    return Array.from(
      { length },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  };

  const chartData = [
    {
      name: "income",
      data: {
        label: "Income",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "amazon-sale",
      data: {
        label: "Amazon Sales",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "amazon-transfer",
      data: {
        label: "Amazon Transfer Account",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "sales",
      data: {
        label: "Sales",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "cogs",
      data: {
        label: "Cost of Goods Sold",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "cogs-cost",
      data: {
        label: "Cost of Goods Sold (Sub-row)",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "shipping",
      data: {
        label: "Shipping",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "gross-profit",
      data: {
        label: "Gross Profit",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "expenses",
      data: {
        label: "Expenses",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "auto-expense",
      data: {
        label: "Automobile Expense Gas",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "bank-charges",
      data: {
        label: "Bank Charges & Fees",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "legal-and-professional-service",
      data: {
        label: "Legal & Professional Services",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "amazon-fees",
      data: {
        label: "Amazon Fees",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "meals-entertainment",
      data: {
        label: "Meals & Entertainment",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "office-supplies",
      data: {
        label: "Office Supplies & Software",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "payroll",
      data: {
        label: "Payroll Expenses",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "payroll-fees",
      data: {
        label: "Payroll Fees",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "payroll-taxes",
      data: {
        label: "Payroll Taxes",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "wages-salary",
      data: {
        label: "Wages & Salary",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "utilities",
      data: {
        label: "Utilities",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "rent-lease",
      data: {
        label: "Rent & Lease",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "new-operating",
      data: {
        label: "Net Operating Income",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "rent-lease-2",
      data: {
        label: "Rent & Lease (Second)",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "assets",
      data: {
        label: "Assets",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "current-assets",
      data: {
        label: "Current Assets",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "bank-accounts",
      data: {
        label: "Bank Accounts",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "5-3-bank-checking",
      data: {
        label: "5/3 Bank Checking",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "checking-1146",
      data: {
        label: "Checking (1146)",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "other-current-assets",
      data: {
        label: "Other Current Assets",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "inventory",
      data: {
        label: "Inventory",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "liabilities-equity",
      data: {
        label: "Liabilities & Equity",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "equity",
      data: {
        label: "Equity",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "opening-balance-equity",
      data: {
        label: "Opening Balance Equity",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "retained-earnings",
      data: {
        label: "Retained Earnings",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
    {
      name: "net-income-2",
      data: {
        label: "Net Income",
        data: generateRandomData(12, 200000, 2000000),
      },
    },
  ];

  function updateCheckedValues() {
    checkedValues = [];
    $('input[name="checkbox_historic"]:checked').each(function () {
      checkedValues.push(this.value);
    });

    checkedValues = [...new Set(checkedValues)];

    if (checkedValues.length >= 3) {
      $('input[name="checkbox_historic"]').each(function () {
        if (checkedValues.includes(this.value)) {
          $(this).prop("disabled", false);
        } else {
          $(this).prop("disabled", true);
        }
      });
    } else {
      $('input[name="checkbox_historic"]').prop("disabled", false);
    }

    updateChart();
  }

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
          return (value * 100).toFixed(2) + "%";
        default:
          return "$" + value;
      }
    };

    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas with id ${canvasId} not found.`);
      return;
    }

    const datasets = data.map((item, index) => ({
      label: item.label,
      data: item.data,
      borderColor: bgColor[index % bgColor.length],
      backgroundColor: "transparent",
      borderWidth: 2,
      pointBackgroundColor: "#FFF",
      pointBorderColor: bgColor[index % bgColor.length],
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
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return formatValue(value);
              },
            },
            grid: { display: gridY },
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
            grid: { display: false },
            border: { display: false },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              padding: 10,
              font: { size: 12 },
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
    });

    if (linkLegend) {
      allCharts.push(chart);
    }
  };

  function updateChart() {
    const matchedData = checkedValues
      .map((value) => {
        const item = chartData.find((item) => item.name === value);
        return item ? { label: item.data.label, data: item.data.data } : null;
      })
      .filter((item) => item !== null);

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
      data: matchedData,
    };

    allCharts.forEach((chart) => chart.destroy());
    allCharts.length = 0;

    initializeChart(
      "historicChart",
      chartData1.labels,
      chartData1.data,
      "M",
      true,
      true
    );

    createLegend();
  }

  function toggleDatasetVisibility(datasetIndex) {
    allCharts.forEach((chart) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.hidden =
        meta.hidden === null ? !chart.data.datasets[datasetIndex].hidden : null;
      chart.update();
    });
  }

  function createLegend() {
    const legendContainer = document.getElementById("chart_legend_historic");
    legendContainer.innerHTML = "";

    if (allCharts.length === 0) return;

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

  $('input[name="checkbox_historic"][value="income"]').prop("checked", true);
  $('input[name="checkbox_historic"][value="bank-accounts"]').prop(
    "checked",
    true
  );

  updateCheckedValues();

  $('input[name="checkbox_historic"]').change(function () {
    updateCheckedValues();
  });
});
