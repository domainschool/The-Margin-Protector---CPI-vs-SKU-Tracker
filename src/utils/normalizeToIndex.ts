import { BlsDataPoint } from '../services/blsApi';
import { SkuDataPoint } from '../hooks/useSkuProcessor';

export interface NormalizedDataPoint {
  date: string; // YYYY-MM
  cpiIndex: number | null;
  skuIndex: number | null;
  marginDelta: number | null; // Negative means SKU pricing is lagging behind inflation
}

/**
 * Converts BLS year and period (e.g., M01) to YYYY-MM format.
 */
function formatBlsDate(year: string, period: string): string {
  const month = period.replace('M', '');
  return `${year}-${month}`;
}

/**
 * Normalizes both BLS CPI data and internal SKU pricing to a 'Base 100' starting point.
 * This establishes an apples-to-apples percentage growth comparison.
 */
export function normalizeToIndex(
  blsData: BlsDataPoint[] | null,
  skuData: SkuDataPoint[] | null
): NormalizedDataPoint[] {
  if (!blsData && !skuData) return [];

  // 1. Convert BLS data into a lookup map { "YYYY-MM": value }
  const cpiMap = new Map<string, number>();
  if (blsData) {
    blsData.forEach((point) => {
      // Skip annual averages, e.g., 'M13'
      if (!point.period.startsWith('M') || point.period === 'M13') return;
      const date = formatBlsDate(point.year, point.period);
      cpiMap.set(date, parseFloat(point.value));
    });
  }

  // 2. Extract and sort all unique dates chronologically
  const allDates = new Set<string>();
  cpiMap.forEach((_, date) => allDates.add(date));
  if (skuData) {
    skuData.forEach((point) => allDates.add(point.date));
  }
  const sortedDates = Array.from(allDates).sort();

  if (sortedDates.length === 0) return [];

  // 3. Establish the base values (Base 100 logic)
  const firstCpiDate = sortedDates.find((d) => cpiMap.has(d));
  const initialCpi = firstCpiDate ? cpiMap.get(firstCpiDate)! : 0;

  const firstSkuDate = skuData && skuData.length > 0 ? skuData[0].date : null;
  const initialSku = firstSkuDate && skuData ? skuData[0].price : 0;

  const result: NormalizedDataPoint[] = [];

  // 4. Carry forward previous values to make the line continuous even if a month is missing
  let lastKnownCpiIndex: number | null = null;
  let lastKnownSkuIndex: number | null = null;

  for (const date of sortedDates) {
    // CPI Index Calculation
    const cpiValue = cpiMap.get(date);
    let cpiIndex: number | null = lastKnownCpiIndex;
    if (cpiValue !== undefined && initialCpi > 0) {
      cpiIndex = (cpiValue / initialCpi) * 100;
      lastKnownCpiIndex = cpiIndex;
    }

    // SKU Index Calculation
    const skuPoint = skuData?.find((s) => s.date === date);
    let skuIndex: number | null = lastKnownSkuIndex;
    if (skuPoint !== undefined && initialSku > 0) {
      skuIndex = (skuPoint.price / initialSku) * 100;
      lastKnownSkuIndex = skuIndex;
    }

    // Margin Delta Calculation
    let marginDelta = null;
    if (cpiIndex !== null && skuIndex !== null) {
      // If SKU index is 105 and CPI index is 110, Margin Delta is -5 (Pricing is lagging)
      marginDelta = Number((skuIndex - cpiIndex).toFixed(2));
    }

    // Only add to timeline if at least one data point exists
    if (cpiIndex !== null || skuIndex !== null) {
      result.push({
        date,
        cpiIndex: cpiIndex !== null ? Number(cpiIndex.toFixed(2)) : null,
        skuIndex: skuIndex !== null ? Number(skuIndex.toFixed(2)) : null,
        marginDelta,
      });
    }
  }

  return result;
}
