// src/components/CovidDataTable.tsx

"use client";

import { CovidRecord } from "@/lib/fetchCovidData";

type Props = {
  data: CovidRecord[];
};

export default function CovidDataTable({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Raw COVID-19 Hospitalization Data
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">State</th>
              <th className="px-3 py-2 border">Year</th>
              <th className="px-3 py-2 border">Month</th>
              <th className="px-3 py-2 border">Rate per 100k</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 25).map((row, i) => (
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
          Showing 25 of {data.length.toLocaleString()} records
        </p>
      </div>
    </div>
  );
}
