// src/app/page.tsx

import { fetchCovidData } from "@/lib/fetchCovidData";
import CovidDashboard from "@/components/CovidDashboard";

export default async function Page() {
  const data = await fetchCovidData();

  // <--------------------------------- DEV LOGS  ----------------------------------->

  // Check total records loaded
  // console.log("✅ Total records parsed:", data.length);

  // Check shape of first record
  // console.log("🔍 Sample record:", data[0]);

  // Check for duplicate or unexpected states
  // const uniqueStates = Array.from(new Set(data.map((d) => d.state)));
  // console.log("🌎 Unique states:", uniqueStates);

  // Check rate range
  // const rates = data.map((d) => d.rate_per_100k);
  // console.log(
  //   "📈 Rate per 100k → Min:",
  //   Math.min(...rates),
  //   "Max:",
  //   Math.max(...rates)
  // );

  // Check time range (month/year)
  // const allMonths = Array.from(new Set(data.map((d) => d.month)));
  // console.log("🗓️ Total months:", allMonths.length);
  // console.log("🗓️ Sorted months preview:", allMonths.slice(0, 6));

  // Confirm grouping is possible
  // const statesGrouped = uniqueStates.reduce((acc, state) => {
  //   acc[state] = data.filter((d) => d.state === state).length;
  //   return acc;
  // }, {} as Record<string, number>);
  // console.log(
  //   "📊 Record count per state (sample):",
  //   Object.entries(statesGrouped).slice(0, 5)
  // );

  // <-------------------------------------------------------------------------------------->

  return <CovidDashboard data={data} />;
}
