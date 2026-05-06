# Project Specifications: Margin Protector (CPI vs. SKU Tracker)

## 1. What the user can send as input
* **Macroeconomic Benchmark Selection:** The user can select a BLS (Bureau of Labor Statistics) category from a dropdown menu (e.g., 'Apparel' or 'Food at Home') to fetch relevant baseline inflation data.
* **Internal SKU Pricing Data:** The user can upload a CSV file containing their historical product pricing. The CSV must have two columns: `date` (format YYYY-MM) and `sku_avg_price`.

## 2. What workflows exist
* **Data Ingestion:** 
  * The user selects a category, triggering an API call to the BLS Public Data API to fetch CPI data.
  * The user uploads a CSV, which is parsed client-side using `PapaParse`.
* **Data Processing & Normalization:** Both the BLS CPI data and the internal SKU pricing data are run through an indexing engine to normalize them to a "Base 100" starting point, allowing for an apples-to-apples percentage growth comparison.
* **Visualization & Alerts:** 
  * The dashboard generates a dual-line chart illustrating the gap between inflation and SKU pricing.
  * KPI cards update to reflect the "Margin Delta". If the internal pricing lags behind inflation by more than 2%, a visual "Red Alert" is triggered.
  * An insights panel generates automated recommendations based on the calculated delta.

## 3. What tools are being used
* **Core Framework:** React, TypeScript, Vite
* **Package Manager:** `pnpm` (strictly mandated)
* **Styling & UI:** Tailwind CSS, Lucide-React
* **Data Visualization:** Recharts
* **Data Parsing:** PapaParse (CSV processing)
* **External APIs:** Bureau of Labor Statistics (BLS) API

## 4. What outputs are expected
* **Professional Financial Terminal UI:** A dark/light mode dashboard featuring a sidebar for controls and a main content area.
* **Interactive Comparison Chart:** A Recharts-powered area/composed chart highlighting the growth trajectories, with color-coded shading (red for lagging, green for leading).
* **Executive KPI Cards:** Three high-impact metrics cards: "Current Inflation Rate," "Your Price Growth," and "Margin Integrity Score."
* **Business Insights Panel:** Automatically generated text insights translating the data into actionable business advice.

## 5. Where data is stored
* **State Management:** All data is processed and temporarily stored client-side in-memory using React Context or custom hooks.
* No persistent backend database is required; the application functions as a static, client-side tool.

## 6. Where the system will be deployed
* **Deployment Target:** GitHub Pages.
* **Deployment Tooling:** The application will use `gh-pages` installed as a dev dependency, with `vite.config.ts` configured with the repository name as the base path.

## 7. What “done” looks like
* The Vite application is successfully built with strict TypeScript compliance (no `any` types, no build errors).
* The user can successfully fetch data from the BLS API and upload a valid CSV.
* The indexing engine correctly normalizes both data streams to Base 100 and visualizes them.
* Alerts and insights trigger accurately based on the > 2% gap condition.
* The app is fully deployed and accessible via GitHub Pages.
* A living documentation file (`explainer.md`) is completed and sits in the root directory, explaining the architecture and logic.
