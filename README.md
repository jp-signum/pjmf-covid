# COVID-19 Hospitalization Trends Dashboard

This full-stack web application provides interactive visualizations and analysis of COVID-19 hospitalization rates across the United States using data from the CDC’s COVID-NET surveillance system. It is designed to help identify trends and support public health decision-making by highlighting areas with high or rising hospitalization rates.

## Live Demo

TODO

---

## Tech Stack

- **Framework:** Next.js (React + API routes)
- **Styling:** Tailwind CSS
- **Charting:** Chart.js (via `react-chartjs-2`)
- **Data Handling:** Native JSON parsing from CDC Socrata API
- **Table:** Custom React components (sortable/filterable)

---

## Features

- Automatically fetches and parses updated COVID-19 hospitalization data from the CDC
- Displays national-level trends over time using line charts
- Allows searching and filtering by U.S. state to explore localized trends
- Interactive, sortable, and filterable data table of raw hospitalization records
- Responsive layout and user-friendly design

---

## Project Structure

```bash
/pages
  index.tsx              → Main dashboard page
  /api/covid.ts          → Server-side route to fetch and parse CDC data
/components
  LineChart.tsx          → Renders trend visualizations
  DataTable.tsx          → Renders sortable/filterable raw data
  StateSearch.tsx        → Search UI for filtering by state
/lib
  fetchCovidData.ts      → CSV download + parsing logic using papaparse
/public
  fallback.csv           → Local backup copy of dataset (optional)
```

## Getting Started

1. Clone the repo

```bash
git clone https://github.com/jp-signum/pjmf-covid
cd pjmf-covid
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

Then open your browser at http://localhost:3000

## Data Access

The data used in this project comes from the CDC's COVID-NET dataset, which reports monthly, laboratory-confirmed COVID-19 hospitalizations:

Dataset: COVID-NET Surveillance - Monthly Hospitalization Rates

[JSON Endpoint](https://data.cdc.gov/api/views/cf5u-bm9w/rows.json?accessType=DOWNLOAD)

Last Updated: August 11, 2025

The app dynamically pulls this data and parses it for visualization. A fallback static copy (/public/fallback.json) is included for testing or offline use.

## Assumptions

- The CDC’s CSV endpoint is always reachable and returns a consistent schema

- “Automatically pulls new data” means fetches latest CSV on API or page load

- Visualizations focus on time-series trends; maps are out of scope for now

- Only U.S. states included in the dataset are visualized (territories omitted)

## Future Enhancements

- Add interactive choropleth map (e.g. via D3 or Leaflet)

- Project future hospitalization trends using ML models

- Persist latest dataset server-side and auto-refresh daily

- Deploy on Vercel or similar for continuous delivery

## License

MIT License
