import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  pointBorderWidth: 0,
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
  },
};

type ChartProps = {
  cryptocurrency: any;
  chartData: Array<Array<number>>;
};

const Chart: React.FC<ChartProps> = ({ cryptocurrency, chartData }) => {
  return (
    <>
      <Line
        options={options}
        data={{
          labels:
            chartData &&
            chartData?.map((data) => {
              return new Date(data[0]).toLocaleString();
            }),
          datasets: [
            {
              label: cryptocurrency?.symbol.toUpperCase(),
              data: chartData && chartData?.map((data) => data[1]),
              borderColor: cryptocurrency?.color ?? "rgb(255, 99, 132)",
              backgroundColor:
                cryptocurrency?.color ?? "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
    </>
  );
};

export default Chart;
