$(document).ready(function () {
  const canvasIds = {
    arDoughnut1: "arDoughnutChart1",
    arDoughnut2: "arDoughnutChart2",
    arDoughnut3: "arDoughnutChart3",
    arDoughnutModal1: "arDoughnutChartModal1",
    arDoughnutModal2: "arDoughnutChartModal2",
    expenses: "expensesDoughnutChart",
    expenses2: "expensesDoughnutChart2",
    expenses3: "expensesDoughnutChart3",
    ai: "aiDoughnutChart",
  };

  // Retrieve canvas contexts
  const getContext = (id) => {
    const canvas = document.getElementById(id);
    return canvas ? canvas.getContext("2d") : null;
  };

  const arDoughnutContext1 = getContext(canvasIds.arDoughnut1);
  const arDoughnutContext2 = getContext(canvasIds.arDoughnut2);
  const arDoughnutContext3 = getContext(canvasIds.arDoughnut3);
  const arDoughnutChartModal1 = getContext(canvasIds.arDoughnutModal1);
  const arDoughnutChartModal2 = getContext(canvasIds.arDoughnutModal2);

  const expensesDoughnutContext = getContext(canvasIds.expenses);
  const expensesDoughnutContext2 = getContext(canvasIds.expenses2);
  const expensesDoughnutContext3 = getContext(canvasIds.expenses3);

  const aiDoughnutChartContext = getContext(canvasIds.ai);

  const bgColor = [
    "#7B61FF",
    "#7DD5F9",
    "#FDB43A",
    "#43E7B7",
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

  function getDoughnutData(data, labels) {
    const bgColorData = data.map(
      (item, index) => bgColor[index % bgColor.length]
    );
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: bgColorData,
          borderWidth: 2,
          hoverOffset: 10,
          hoverBorderColor: "#FFFFFF",
        },
      ],
    };
  }

  function getResponsiveOptions(context, centerText) {
    const chartWidth = context.canvas.parentNode.clientWidth;
    const padding = chartWidth < 400 ? 50 : 100;
    const fontSizeText = chartWidth < 400 ? 10 : 16;
    const fontSizeLabel = chartWidth < 400 ? 10 : 14;
    const lineLength = chartWidth < 400 ? 10 : 20;
    const lineHeight = chartWidth < 400 ? 9 : 18;
    const cutoutPercentage = "74%";

    return {
      layout: { padding: padding },
      plugins: {
        datalabels: { display: false },
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${
                tooltipItem.label
              }: $${tooltipItem.raw.toLocaleString()}`;
            },
          },
        },
        centerText: {
          display: true,
          text: `Total ${centerText}`,
          color: "#000000",
          font: { size: fontSizeText, weight: "200" },
        },
        customDataLabel: {
          display: true,
          font: { size: fontSizeLabel, weight: "bold" },
          lineLength: lineLength,
          lineHeight: lineHeight,
        },
      },
      responsive: true,
      cutout: cutoutPercentage,
    };
  }

  function formatNumber(value) {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(1) + "k";
    return value;
  }

  // Register Chart.js plugins
  Chart.register({
    id: "centerText",
    beforeDraw(chart) {
      const { ctx, chartArea, config } = chart;
      const pluginOptions = config.options.plugins.centerText || {};

      if (pluginOptions.display) {
        const {
          text = "",
          color = "#2A3547",
          font = { size: 20, weight: "semibold" },
        } = pluginOptions;
        const { width, height } = chartArea;

        ctx.save();
        ctx.font = `${font.weight} ${font.size}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textBaseline = "middle";

        const textCenter = text.split(" ");
        const lineHeight = 24;
        const totalTextHeight = lineHeight * textCenter.length;

        const startY =
          height / 2 + chartArea.top - totalTextHeight / 2 + lineHeight / 2;
        textCenter.forEach((line, i) => {
          const x = width / 2 + chartArea.left;
          const y = startY + i * lineHeight;
          ctx.textAlign = "center";
          ctx.fillText(line, x, y);
        });

        ctx.restore();
      }
    },
  });

  Chart.register({
    id: "customDataLabel",
    afterDatasetDraw(chart, args, pluginOptions) {
      if (chart.config.type === "doughnut" && pluginOptions.display) {
        const {
          ctx,
          chartArea: { width, height },
        } = chart;
        const dataset = chart.data.datasets[0];
        const meta = chart.getDatasetMeta(0);
        const radius = (width / 10) * 0.8;
        const lineLength = pluginOptions.lineLength;

        ctx.save();
        ctx.font = `${pluginOptions.font.weight} ${pluginOptions.font.size}px sans-serif`;
        ctx.fillStyle = pluginOptions.color || "#2A3547";
        ctx.textBaseline = "middle";

        dataset.data.forEach((dataPoint, index) => {
          const label = chart.data.labels[index];
          const arc = meta.data[index];
          const center = arc.getCenterPoint();
          const angle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;

          const startX = center.x + Math.cos(angle) * radius;
          const startY = center.y + Math.sin(angle) * radius;
          const outerX = center.x + Math.cos(angle) * (radius + lineLength);
          const outerY = center.y + Math.sin(angle) * (radius + lineLength);

          ctx.textAlign = outerX > center.x ? "left" : "right";
          ctx.strokeStyle = "#DFE5EF";
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(outerX, outerY);
          ctx.stroke();

          const maxWidth = 100;
          const words = label.split(" ");
          let lines = [];
          let currentLine = words[0];

          words.slice(1).forEach((word) => {
            const width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
              currentLine += " " + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          });
          lines.push(currentLine);

          const labelText = lines.join("\n") + "\n$" + formatNumber(dataPoint);
          const labelLines = labelText.split("\n");
          const lineHeight = pluginOptions.lineHeight;

          labelLines.forEach((line, i) => {
            const x = outerX + (outerX > center.x ? 5 : -5);
            const y = outerY + i * lineHeight;
            ctx.fillText(line, x, y);
          });
        });

        ctx.restore();
      }
    },
  });

  function renderChart(context, data, labels, centerText) {
    if (context) {
      const doughnutData = getDoughnutData(data, labels);
      const options = getResponsiveOptions(context, centerText);

      new Chart(context, {
        type: "doughnut",
        data: doughnutData,
        options: options,
      });
    }
  }

  // Data and configuration for the charts
  const arData = [8000, 17000, 11000, 23000, 10000];
  const arLabels = [
    "Current",
    "1–30 days",
    "31–60 days",
    "61–90 days",
    "91 and over",
  ];
  const arCenterText = "$58,458";

  const expensesData = [17000, 48000, 82000, 90000, 4000];
  const expensesLabels = [
    "Truck Parking",
    "Insurance",
    "Total Payroll Expenses",
    "Other",
    "Meals",
  ];
  const expensesCenterText = "$45,000";

  // Render each chart with its specific data and options
  renderChart(arDoughnutContext1, arData, arLabels, arCenterText);
  renderChart(arDoughnutContext2, arData, arLabels, arCenterText);
  renderChart(arDoughnutContext3, arData, arLabels, arCenterText);
  renderChart(arDoughnutChartModal1, arData, arLabels, arCenterText);
  renderChart(arDoughnutChartModal2, arData, arLabels, arCenterText);
  renderChart(aiDoughnutChartContext, arData, arLabels, arCenterText);

  renderChart(
    expensesDoughnutContext,
    expensesData,
    expensesLabels,
    expensesCenterText
  );

  renderChart(
    expensesDoughnutContext2,
    expensesData,
    expensesLabels,
    expensesCenterText
  );

  renderChart(
    expensesDoughnutContext3,
    expensesData,
    expensesLabels,
    expensesCenterText
  );

  $(window).resize(function () {
    // Re-render charts on window resize
    renderChart(arDoughnutContext1, arData, arLabels, arCenterText);
    renderChart(arDoughnutContext2, arData, arLabels, arCenterText);
    renderChart(arDoughnutContext3, arData, arLabels, arCenterText);
    renderChart(arDoughnutChartModal1, arData, arLabels, arCenterText);
    renderChart(arDoughnutChartModal2, arData, arLabels, arCenterText);
    renderChart(aiDoughnutChartContext, arData, arLabels, arCenterText);
    renderChart(
      expensesDoughnutContext,
      expensesData,
      expensesLabels,
      expensesCenterText
    );

    renderChart(
      expensesDoughnutContext2,
      expensesData,
      expensesLabels,
      expensesCenterText
    );

    renderChart(
      expensesDoughnutContext3,
      expensesData,
      expensesLabels,
      expensesCenterText
    );
  });
});
