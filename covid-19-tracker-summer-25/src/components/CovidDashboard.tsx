// src/components/CovidDashboard.tsx

"use client";

import { useState, useMemo } from "react";
import { CovidRecord } from "@/lib/fetchCovidData";
import CovidDataTable from "./CovidTable";
import CovidTrendChart from './CovidTrendChart';

type Props = {
  data: CovidRecord[];
};

export default function CovidDashboard({ data }: Props) {
  const [selectedState, setSelectedState] = useState<string>("All");

  const availableStates = useMemo(() => {
    return Array.from(
      new Set(data.map((d) => d.state).filter((s) => s && s !== "COVID-NET"))
    ).sort();
  }, [data]);

  const filteredData = useMemo(() => {
    if (selectedState === "All") return data;
    return data.filter((d) => d.state === selectedState);
  }, [data, selectedState]);

  return (
    <section className="bg-white text-gray-900 min-h-screen max-w-6xl mx-auto px-4 py-10 space-y-8 rounded shadow">
      <header>
        <h1 className="text-3xl font-semibold text-[#007d99] mb-4">
          U.S. COVID-19 Hospitalization Trends
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <label
            htmlFor="state-filter"
            className="text-sm font-medium text-gray-800"
          >
            Filter by state:
          </label>
          <select
            id="state-filter"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-900 shadow-sm focus:ring-[#007d99] focus:border-[#007d99]"
          >
            <option value="All">All States</option>
            {availableStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Chart placeholder — PJMF colors will apply here */}
      {/* {selectedState !== 'All' && (
        <CovidTrendChart data={filteredData} state={selectedState} />
      )} */}

      <CovidDataTable data={filteredData} />
    </section>
  );
}
