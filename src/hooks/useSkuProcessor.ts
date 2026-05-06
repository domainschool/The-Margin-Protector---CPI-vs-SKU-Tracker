import { useState, useCallback } from 'react';
import Papa from 'papaparse';

export interface SkuDataPoint {
  date: string; // YYYY-MM
  price: number;
}

export function useSkuProcessor() {
  const [skuData, setSkuData] = useState<SkuDataPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setError(null);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsedData: SkuDataPoint[] = results.data.map((row: any) => {
            const date = row['Date'] || row['date'] || row['DATE'];
            const priceStr = row['Price'] || row['price'] || row['sku_avg_price'] || row['PRICE'];
            
            if (!date || !priceStr) {
              throw new Error('CSV must contain Date and Price columns');
            }

            const price = parseFloat(String(priceStr).replace(/[^0-9.-]+/g, ""));
            if (isNaN(price)) {
              throw new Error(`Invalid price value found: ${priceStr}`);
            }

            return { date, price };
          });
          
          // Sort by date ascending (YYYY-MM)
          parsedData.sort((a, b) => a.date.localeCompare(b.date));
          setSkuData(parsedData);
        } catch (err: any) {
          setError(err.message || 'Error processing CSV file');
        }
      },
      error: (error) => {
        setError(error.message);
      }
    });
  }, []);

  return { skuData, error, processFile };
}
