// src/components/CovidDataTable.tsx

"use client";

import { useState, useMemo } from "react";
import { CovidRecord } from "@/lib/fetchCovidData";

type Props = {
  data: CovidRecord[];
};

export default function CovidDataTable({ data }: Props) {
  const [sortBy, setSortBy] = useState<keyof CovidRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedState, setSelectedState] = useState<string>("All");

  const availableStates = useMemo(() => {
    return Array.from(
      new Set(data.map((d) => d.state).filter((s) => s && s !== "COVID-NET"))
    ).sort();
  }, [data]);

  const filtered = useMemo(() => {
    if (selectedState === "All") return data;
    return data.filter((d) => d.state === selectedState);
  }, [data, selectedState]);

  const sortedRows = useMemo(() => {
    if (!sortBy) return filtered.slice(0, 25);

    const sorted = [...filtered].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }

      return sortDirection === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    return sorted.slice(0, 25);
  }, [filtered, sortBy, sortDirection]);

  const handleSort = (column: keyof CovidRecord) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Raw COVID-19 Hospitalization Data
      </h2>

      <div className="mb-4">
        <label htmlFor="state-filter" className="text-sm font-medium mr-2">
          Filter by state:
        </label>
        <select
          id="state-filter"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="All">All</option>
          {availableStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              {(
                [
                  "state",
                  "year",
                  "month",
                  "rate_per_100k",
                ] as (keyof CovidRecord)[]
              ).map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 border cursor-pointer select-none"
                  onClick={() => handleSort(col)}
                >
                  {col === "rate_per_100k"
                    ? "Rate per 100k"
                    : col.charAt(0).toUpperCase() + col.slice(1)}
                  {sortBy === col && (
                    <span className="ml-1 text-gray-500">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => (
              <tr key={i} className="even:bg-gray-50">
                <td className="px-3 py-2 border">{row.state}</td>
                <td className="px-3 py-2 border">{row.year}</td>
                <td className="px-3 py-2 border">{row.month}</td>
                <td className="px-3 py-2 border">
                  {row.rate_per_100k.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-2 text-xs text-gray-500">
          Showing {Math.min(sortedRows.length, 25)} of{" "}
          {filtered.length.toLocaleString()} records
        </p>
      </div>
    </div>
  );
}
