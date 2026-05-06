# Margin Protector: Vibe-Coding Implementation Prompts

Follow these prompts one-by-one. Ensure each step is functional and tested before moving to the next.

## Phase 1: Foundation & Layout

### Prompt 1: Scaffolding and Theme
"Initialize a new Vite project using React and TypeScript with pnpm. Install Tailwind CSS and Lucide-React. Create a high-fidelity 'Professional Financial Terminal' layout. It should have a sidebar for controls and a main content area with a dark/light mode toggle. Use a sophisticated color palette (Slate, Indigo, and Emerald). Add a header titled 'Margin Protector' with a subtitle 'Macroeconomic Pricing Intelligence'."

---

## Phase 2: Data Acquisition

### Prompt 2: BLS API Service & Environment
"Create a service file `services/blsApi.ts`. Implement a function to fetch Consumer Price Index data from the BLS API. Use a `.env.example` file to show where the `VITE_BLS_API_KEY` goes. Support two series by default: 'Apparel' (CUUR0000SAA) and 'Food at Home' (CUUR0000SAF11). Create a UI dropdown in the sidebar to switch between these categories and show a loading spinner while fetching."

### Prompt 3: SKU Data Processor (CSV)
"Install `papaparse` and its types. Create a custom hook `useSkuProcessor` that handles CSV uploads. The expected format is two columns: 'Date' (YYYY-MM) and 'Price'. Add a drag-and-drop upload zone in the sidebar using Tailwind. Ensure it parses the data into a clean TypeScript interface and stores it in the global state."

---

## Phase 3: The Domain Logic

### Prompt 4: The Indexing Engine
"Create a utility function `normalizeToIndex`. This is the core logic: Take both the BLS data and the SKU data and normalize them to a 'Base 100' starting point. This means the first available date in the dataset should equal 100, and every subsequent point is a percentage of that start. This allows an apples-to-apples growth comparison regardless of the actual price dollar amount."

---

## Phase 4: Visualizing the "Aha!" Moment

### Prompt 5: The Comparison Chart
"Install `recharts`. Build a sophisticated line chart in the main dashboard area. It must show two lines: 'Market Inflation (CPI)' and 'Internal Price Index'. Use an AreaChart or a ComposedChart to shade the area between the two lines: red if the SKU is lagging behind inflation, and green if it is leading. Add a custom tooltip that shows the exact 'Margin Delta' percentage at any given point."

### Prompt 6: Executive KPI Cards
"Add three high-impact KPI cards above the chart: 
1. 'Current Inflation Rate' (the most recent % change from BLS).
2. 'Your Price Growth' (your total % change).
3. 'Margin Integrity Score'. 
If the Gap is > 2%, make the Margin Integrity card pulse red with a warning icon from Lucide-React and the text 'ACTION REQUIRED: Margin Erosion Detected'."

---

## Phase 5: Polish & Deployment

### Prompt 7: Insights & Deployment
"Add a 'Business Insights' panel below the chart that uses the calculated data to generate 2-3 bullet points of automated advice (e.g., 'Your pricing is currently 3.4% behind the national average for this category. To maintain current margins, consider a price adjustment of at least $X'). Finally, add the gh-pages deployment scripts to package.json as per the instructions.md standards."
