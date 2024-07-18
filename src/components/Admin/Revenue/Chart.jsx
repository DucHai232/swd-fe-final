import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = ({ dataMonth, monthSelected }) => {
  const dataValues = [
    dataMonth.week1 || 0,
    dataMonth.week2 || 0,
    dataMonth.week3 || 0,
    dataMonth.week4 || 0,
    dataMonth.week5 || 0,
  ];

  const labels = [];
  const filteredDataValues = [];
  for (let i = 0; i < dataValues.length; i++) {
    if (dataValues[i] !== 0) {
      labels.push(`Week ${i + 1}`);
      filteredDataValues.push(dataValues[i]);
    }
  }

  const monthName = monthNames[monthSelected - 1];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Revenue by week",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: filteredDataValues,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: monthSelected ? `Monthly revenue ${monthName}` : "No data",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
