# Margin Protector - Architecture & Logic Explainer

This document provides a simple, living explanation of how the Margin Protector application works, its core logic, and its dependencies. It must be updated any time a new feature, API, or package is added.

## 1. Architecture & Data Flow

The application is a pure client-side React SPA (Single Page Application) built with Vite and TypeScript. It does not require a backend database. 

**The flow of data is as follows:**
1. **User Input:** The user selects a macroeconomic category (e.g., 'Apparel') from a dropdown, and simultaneously uploads a CSV file containing their internal product SKU pricing data.
2. **Data Ingestion:**
   - The selected category triggers an API call to the Bureau of Labor Statistics (BLS) Public Data API to fetch historical inflation data (CPI) for that specific sector.
   - The uploaded CSV is parsed directly in the browser using the `PapaParse` library.
3. **Data Normalization:** Both datasets are sent to a core utility function (`normalizeToIndex`), which calculates a shared timeline.
4. **State Update:** The normalized data is stored in the global component state.
5. **Visualization:** The React components automatically re-render, drawing the Recharts comparison area chart and updating the executive KPI cards and automated Business Insights panel.

## 2. Core Logic: The Indexing Engine ("Base 100")

To compare raw dollars (SKU prices) with index values (CPI), we use a standard financial concept known as "Base 100 Indexing".

*   **Establishing the Base:** The system finds the earliest date where *both* the internal SKU data and the CPI data have a value. It assigns both lines a starting value of `100`.
*   **Calculating Growth:** For every subsequent month, the current value is divided by the base value and multiplied by 100.
    *   *Example:* If a SKU started at $20 (Base 100), and rose to $22, the index is `(22 / 20) * 100 = 110`. It grew by 10%.
*   **The Margin Delta:** We simply subtract the CPI Index from the SKU Index. If the result is negative (e.g., CPI = 115, SKU = 105), the retailer is lagging behind inflation by 10%, triggering a red "Margin Erosion" alert.

## 3. Dependencies & Integrations

### External APIs
*   **Bureau of Labor Statistics (BLS) Public Data API:** Used to fetch real-world Consumer Price Index (CPI) metrics. Series IDs `CUUR0000SAA` (Apparel) and `CUUR0000SAF11` (Food at Home) are configured by default. Rate limiting applies without a key.

### Core NPM Packages
*   `react` & `react-dom`: Core UI library.
*   `vite`: Build tool and dev server.
*   `typescript`: Ensures strict type safety and eliminates entire classes of runtime bugs.
*   `tailwindcss`: Utility-first CSS framework for rapid UI styling, powering the "Boardroom" aesthetic.
*   `lucide-react`: Lightweight SVG icon library.
*   `recharts`: Used for building the interactive, shaded area chart comparing the two indexes.
*   `papaparse`: Robust CSV parser used to securely process user-uploaded pricing data entirely within the browser.
*   `gh-pages`: Development dependency used to automate the build and push deployment to GitHub Pages.
