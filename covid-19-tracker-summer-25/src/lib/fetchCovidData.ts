// src/lib/fetchCovidData.ts

export type CovidRecord = {
  state: string;
  surveillance_year: string;
  year: number;
  month: number;
  rate_per_100k: number;
};

const JSON_URL =
  "https://data.cdc.gov/api/views/cf5u-bm9w/rows.json?accessType=DOWNLOAD";

export async function fetchCovidData(): Promise<CovidRecord[]> {
  const res = await fetch(JSON_URL);
  const json = await res.json();

  console.log("Raw row sample:", json.data?.[0]);
  
  const STATE_INDEX = 8;
   const SURVEILLANCE_YEAR_INDEX = 9;
   const PERIOD_INDEX = 10; 
   const RATE_INDEX = 14; 

  const records: CovidRecord[] = (json.data as unknown[])
    .map((row) => {
      const r = row as string[];

      // Safely parse period into year/month
      const rawPeriod = r[PERIOD_INDEX] ?? "";
      const periodStr = rawPeriod.toString().split(".")[0];
      const year = parseInt(periodStr.slice(0, 4), 10);
      const month = parseInt(periodStr.slice(4, 6), 10);

      return {
        state: r[STATE_INDEX],
        surveillance_year: r[SURVEILLANCE_YEAR_INDEX],
        year,
        month,
        rate_per_100k: parseFloat(r[RATE_INDEX]),
      };
    })
    .filter(
      (r) =>
        r.state && !isNaN(r.year) && !isNaN(r.month) && !isNaN(r.rate_per_100k)
    );

  return records;
}
