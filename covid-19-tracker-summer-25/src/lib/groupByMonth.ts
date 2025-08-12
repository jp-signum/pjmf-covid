// src/lib/groupByMonth.ts

import { CovidRecord } from "./fetchCovidData";

export function groupByMonth(records: CovidRecord[]) {
  const monthMap = new Map<string, number[]>();

  records.forEach((record) => {
    const key = `${record.year}-${String(record.month).padStart(2, "0")}`;

    if (!monthMap.has(key)) {
      monthMap.set(key, []);
    }

    monthMap.get(key)?.push(record.rate_per_100k);
  });

  // Turn into chart data format
  const aggregated = Array.from(monthMap.entries())
    .map(([month, rates]) => ({
      label: month,
      avgRate: rates.reduce((a, b) => a + b, 0) / rates.length,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return aggregated;
}
