// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";

import NationalTrendChart from "@/components/NationalTrendChart";
import CovidDataTable from "@/components/CovidDataTable";


import { fetchCovidData, CovidRecord } from "@/lib/fetchCovidData";
import { groupByMonth } from "@/lib/groupByMonth";

export default function HomePage() {
  const [data, setData] = useState<CovidRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<
    { label: string; avgRate: number }[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.time("fetchCovidData");
        const result = await fetchCovidData();
        console.timeEnd("fetchCovidData");

        console.log("Total records:", result.length);
        console.log("Sample data:", result.slice(0, 3));

        console.log(
          "Unique states/sites:",
          Array.from(new Set(result.map((d) => d.state)))
        );

        const grouped = groupByMonth(result);
        setChartData(grouped);

        console.log("Grouped monthly data (first 5):", grouped.slice(0, 5));
        console.log("Total months:", grouped.length);
        console.log("Max rate:", Math.max(...grouped.map((d) => d.avgRate)));
        console.log("Min rate:", Math.min(...grouped.map((d) => d.avgRate)));

        const isSorted = grouped.every(
          (d, i, arr) => i === 0 || arr[i - 1].label <= d.label
        );
        console.log("Data sorted chronologically?", isSorted);

        if (result.some((d) => d.year > new Date().getFullYear())) {
          console.warn("🚨 Future dates found in dataset");
        }

        setData(result);
      } catch (err) {
        console.error("Data fetch failed:", err);
        setError("Failed to load COVID-19 data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">
        COVID-19 Hospitalization Trends Dashboard
      </h1>

      {loading && <p>Loading data…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {data.length.toLocaleString()} records loaded and parsed
            successfully.
          </p>

          <pre className="bg-white border border-gray-200 rounded p-4 text-xs overflow-x-auto">
            {JSON.stringify(data.slice(0, 3), null, 2)}
          </pre>

          {!loading && !error && chartData.length > 0 && (
            <NationalTrendChart data={chartData} />
          )}

          {!loading && !error && data.length > 0 && (
            <CovidDataTable data={data} />
          )}
        </div>
      )}
    </main>
  );
}
