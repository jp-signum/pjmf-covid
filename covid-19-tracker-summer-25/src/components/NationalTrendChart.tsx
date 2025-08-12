// src/components/NationalTrendChart.tsx

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

type Props = {
  data: { label: string; avgRate: number }[];
};

export default function NationalTrendChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        National COVID‑19 Hospitalization Trend
      </h2>
      <Line
        data={{
          labels: data.map((d) => d.label),
          datasets: [
            {
              label: "Average Rate per 100,000",
              data: data.map((d) => d.avgRate),
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              borderWidth: 2,
              fill: true,
              tension: 0.2,
              pointRadius: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              title: { display: true, text: "Month" },
              ticks: { maxTicksLimit: 12 },
            },
            y: {
              title: { display: true, text: "Rate per 100,000" },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
