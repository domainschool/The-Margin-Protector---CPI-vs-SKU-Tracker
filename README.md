<div align="center">

# 🛡️ Margin Protector

**A strategic decision-support tool auditing retail pricing agility against macroeconomic reality.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](#)

[🚀 View Live Demo](https://your-username.github.io/margin-protector/) • [📖 Read the Explainer](explainer.md)

<br/>

*(Insert a high-quality screenshot of the dashboard here)*  
`![Margin Protector Dashboard Preview](./path/to/screenshot.png)`

<br/>

</div>

---

## 📉 The Business Problem

**"The Silent Margin Killer"**

In an inflationary environment, selling more units doesn't mean more profit if your *replacement costs* outpace your shelf prices. Most small-to-mid-sized retailers change prices based on gut feeling or competitor behavior, leaving them highly vulnerable to capital depletion.

* **Margin Erosion:** A mere 2% lag in pricing relative to inflation can wipe out 20% of net profit in high-volume retail.
* **The Reactive Posture:** Being the last in the market to adjust prices turns the business into a "charity" for price-sensitive shoppers at the expense of its own survival.

Margin Protector serves as the **"Check Engine" light** for a company's bottom line. By proving that internal SKU pricing is lagging behind the Consumer Price Index (CPI), it provides pricing teams with the quantitative "Moral Authority" to take immediate action.

---

## ✨ Core Features & Domain Logic

### Key Features
1. **Macroeconomic Ingestion:** Connects directly to the Bureau of Labor Statistics (BLS) Public Data API to fetch historical inflation data.
2. **Local SKU Processing:** Drag-and-drop secure CSV parsing of internal pricing data entirely within the browser using PapaParse.
3. **Automated Alerts:** A dynamic "Margin Integrity Score" that pulses red when critical margin erosion (>2% lag) is detected.
4. **Executive Insights Engine:** Generates plain-English business recommendations (e.g., specific target prices) based on the calculated deltas.

### 🧠 Domain Logic
To build a solution that matters, this project implements fundamental financial concepts rather than just rendering raw numbers:

* **Base 100 Indexing:** Establishes a unified base date (Index = 100) where both internal SKU data and CPI data intersect. This normalizes the data, allowing an apples-to-apples comparison of *percentage growth* rather than comparing mismatched raw dollars to index values.
* **Replacement Cost Accounting:** The application logic is rooted in the financial principle that a product's value is determined by what it costs to buy *today*, not the historical cost.
* **Price Elasticity Context:** Macro categories (like "Apparel" vs. "Food at Home") are provided to allow operators to contextualize elasticity and necessity before adjusting prices.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** React 18
* **Tooling:** Vite + TypeScript
* **Styling:** Tailwind CSS + PostCSS
* **Visualizations:** Recharts + Framer Motion
* **Icons:** Lucide React

### How It Works (Data Flow)
1. The user selects a macroeconomic category and uploads their internal CSV file.
2. The client fetches the corresponding CPI series from the BLS API.
3. The raw numbers are passed to the `normalizeToIndex` utility, which calculates the shared Base 100 timeline and identifies the "Margin Delta" for each period.
4. The React components re-render, drawing the Recharts comparison area chart and updating the Executive KPI cards and Insights panel based on the computed health score.

---

## 🚀 Getting Started

Follow these steps to run the Margin Protector locally:

### Prerequisites
* **Node.js** (v18+ recommended)
* **pnpm** installed globally

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/margin-protector.git
   cd margin-protector
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Copy the example environment file and add your BLS API key (optional, but recommended for higher rate limits).
   ```bash
   cp .env.example .env.local
   ```
   *Edit `.env.local` to include your `VITE_BLS_API_KEY`.*

4. **Start the development server**
   ```bash
   pnpm run dev
   ```
   Navigate to `http://localhost:5173/margin-protector/` in your browser.

---

## 🔮 Future Roadmap

While the MVP provides immediate baseline truth, the architecture supports enterprise-scale expansion:
* **Real-time POS Integration:** Shift from manual CSV uploads to automated API ingestion from ERP systems.
* **Competitor Scraping:** Hyper-local, competitor-specific indices to measure cross-elasticity.
* **Predictive Revenue Modeling:** "What-If" scenario planning using AI to forecast the exact volume drop-off for a proposed price hike.
* **Automated Execution:** API integrations pushing approved price updates directly to Electronic Shelf Labels (ESL) or eCommerce platforms.

---

## 🎓 Built with the Domain School Framework

This project was developed as part of a mission to bridge the gap between technical execution and industry domain knowledge. We believe that **syntax is becoming a commodity, but domain logic is a competitive edge.** We build software that solves real-world business problems.

[![Domain School](https://img.shields.io/badge/Join_The-Masterclass-4F46E5?style=for-the-badge&logo=book&logoColor=white)](#)  
*Learn more about building high-impact software by mastering the business domain.*
