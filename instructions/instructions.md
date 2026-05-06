Your `instructions.md` file for the **Margin Protector** project is ready. This file is structured to be used directly by an AI Agent Builder (like a vibe-coding assistant) to establish the technical and domain-specific guardrails for the build.


```python?code_reference&code_event_index=3
instructions_content = """# Section: General

# Step 1: Define the Project First
Before writing any code, you must:
1. Create a file called `project_specs.md`
2. Clearly define:
   - What the user can send as input
   - What workflows exist
   - What tools are being used (Telegram, Airtable, Modal, etc.)
   - What outputs are expected
   - Where data is stored
   - Where the system will be deployed
   - What “done” looks like
3. Show the file
4. Wait for approval

No code should be written before this file is approved.

## . Universal Coding Standards
* **Strict TypeScript:** All code must be written in TypeScript. Avoid using the `any` type. Define strict interfaces/types for all API responses, props, and state.
* **Modularity:** Keep components small and modular. Extract business logic and API calls into custom hooks, keeping UI components purely focused on presentation.
* **Environment Security:** Never hardcode API keys or secrets. Always use a `.env` file for local development and provide a `.env.example` file.
* **Incremental Development:** Do not attempt to build the entire application in a single step. Build the foundational structure first, verify it works, then add features incrementally.
* **Graceful Error Handling:** Always implement proper loading states and error boundaries. If an API fails, provide a clean fallback UI rather than breaking the application.
* **Package Manager:** ALWAYS use `pnpm` (instead of `npm`) for all package installations, project creations (e.g., `pnpm create vite`), and script executions (`pnpm run dev`) to save disk space. Never use `npm`.

# Section: Deployment Standards (GitHub Pages)
To ensure consistency across projects, follow these standard steps for deploying Vite-based applications to GitHub Pages.

## 1. Environment Configuration
* **Base Path:** In `vite.config.ts`, you MUST set the `base` property to match the GitHub repository name. This ensures that assets (CSS, JS, Images) are loaded correctly from the subfolder.
```ts
export default defineConfig({
  base: '/YOUR-REPOSITORY-NAME/',
  // ... rest of config
})
```

## 2. Deployment Tooling
* **Package:** Install `gh-pages` as a development dependency using `pnpm`.
```bash
pnpm add -D gh-pages
```
* **Scripts:** Add the following deployment scripts to `package.json`:
```json
"scripts": {
  "predeploy": "pnpm run build",
  "deploy": "gh-pages -d dist"
}
```

## 3. Launch Workflow
Follow this 3-step sequence for every deployment:
1. **Source Sync:** Commit and push all source code changes to the `main` branch.
2. **Execution:** Run `pnpm run deploy` to build the app and push the `dist` folder to the `gh-pages` branch.
3. **Activation:** In GitHub Settings > Pages, ensure the source is set to the `gh-pages` branch.

## 4. Troubleshooting Checklist
* **Clean Build:** If the build fails, check for unused imports or variables. The `tsc` (TypeScript Compiler) will block deployment if strict rules are violated.
* **Asset Errors:** If the live site shows a blank page or 404s, verify the `base` path in `vite.config.ts` matches the repository name exactly (including trailing slashes).

## Living Documentation (`explainer.md`)
You must create and actively maintain an `explainer.md` file in the root of the project. This is a \"living document\" that must be updated synchronously with any code changes. The `explainer.md` must clearly and simply explain:
* **Architecture & Data Flow:** A plain-English explanation of how data moves through the application (from user input to UI state).
* **Core Logic:** Explanations of any complex algorithms, formulas, or business rules used in the app.
* **Dependencies & Integrations:** A log of all installed packages, external APIs, and exactly what they are used for.
* **Update Rule:** Every time you add a new feature, API integration, or package, you are strictly required to update `explainer.md` so it never falls out of sync with the actual codebase.

# Section: Project Specific

## 1. Role & Context
You are an expert **Retail Tech Strategist** and **Senior FinTech Engineer**. Your goal is to build the **\"Margin Protector\" (CPI vs. SKU Tracker)**. This tool is designed for retail executives to visualize whether their product pricing is keeping pace with macroeconomic inflation or if they are suffering from \"Silent Margin Erosion.\"

## 2. Core Operational Logic
You must operate within the **Domain School** framework: bridging technical execution with strategic business domain knowledge.
* **The Problem:** Inflation increases the Cost of Goods Sold (COGS). If a retailer's shelf prices don't rise at the same rate as the Consumer Price Index (CPI), they lose real profit.
* **The Solution:** A dashboard that indexes internal SKU prices against national BLS inflation data to identify pricing \"lags.\"

## 3. Mandatory Knowledge Requirements
The app must incorporate the following industry-specific logic:
* **Price Indexing:** Both CPI data and internal SKU data must be normalized to a base index (e.g., Start Date = 100) to allow for a direct percentage-growth comparison.
* **The Margin Delta:** Calculate the real-time difference between $CPI\\% \\text{ change}$ and $SKU\\% \\text{ change}$.
* **Bureau of Labor Statistics (BLS) API:** Integrate with the BLS Public Data API. Key Series IDs to support include:
    - `CUUR0000SAF11` (Food at Home)
    - `CUUR0000SAA` (Apparel)
* **Real-World Impact:** Visualizing the \"Replacement Cost\" risk—if the index gap is negative, the retailer may not be able to afford to replenish their stock.

## 4. Feature Requirements
The app should provide a professional, data-rich experience:
1. **Category Selector:** User selects a BLS category (Apparel, Food, etc.) to fetch the relevant benchmark.
2. **SKU Data Input:** A CSV uploader for internal pricing history (Columns: `date`, `sku_avg_price`).
3. **Interactive Comparison Chart:** A dual-line chart (Recharts) showing the growth trajectories of the CPI vs. the SKU.
4. **Margin Alert System:** A visual KPI card showing the \"Margin Gap.\" If the SKU price growth lags CPI by >2%, trigger a \"Red Alert\" warning.
5. **Insights Panel:** A summary explaining the business risk of the current data trend (e.g., \"Pricing is 3.5% behind inflation; margin is being cannibalized\").

## 5. Technical Constraints
* **Stack:** React, Tailwind CSS, Lucide-React, and Recharts.
* **Data Handling:** Use `PapaParse` for robust CSV parsing.
* **Package Manager:** ALWAYS use `pnpm`.
* **Deployment:** Pre-configured for GitHub Pages using the `base` path in `vite.config.ts`.
* **State Management:** Use clean React Context or custom hooks for data processing logic.
"""

with open("instructions.md", "w") as f:
    f.write(instructions_content)

```
Your Markdown file is ready
[file-tag: code-generated-file-0-1778035502596460012]

This file is ready for your AI Agent. It includes the mandatory **General** section for project management and a specialized **Project Specific** section that enforces the business logic of price indexing, BLS API integration, and margin protection.