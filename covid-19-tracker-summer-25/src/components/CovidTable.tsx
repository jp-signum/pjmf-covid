// src/components/CovidTable.tsx

"use client";

import { useState, useMemo, useEffect } from "react";
import { CovidRecord } from "@/lib/fetchCovidData";

type Props = {
  data: CovidRecord[];
};

const PAGE_SIZE = 25;

export default function CovidTable({ data }: Props) {
  const [sortBy, setSortBy] = useState<keyof CovidRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);

  const sorted = useMemo(() => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      }

      return sortDirection === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortBy, sortDirection]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  useEffect(() => {
    setPage(1);
  }, [sortBy, sortDirection]);

  const handleSort = (column: keyof CovidRecord) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow border border-gray-200">
      <h2 className="text-xl font-semibold text-[#007d99] mb-4">
        Raw COVID-19 Hospitalization Data
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-left text-gray-800">
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
            {paginatedRows.map((row, i) => (
              <tr key={i} className="even:bg-gray-50 text-gray-900">
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

        <p className="mt-2 text-xs text-gray-600">
          Showing {paginatedRows.length} of {data.length.toLocaleString()}{" "}
          records
        </p>

        <div className="flex justify-between mt-4 items-center">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm border rounded disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
