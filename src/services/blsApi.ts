// BLS API response structure
export interface BlsDataPoint {
  year: string;
  period: string; // e.g., 'M01'
  periodName: string;
  value: string;
}

export interface BlsSeries {
  seriesID: string;
  data: BlsDataPoint[];
}

export interface BlsResponse {
  status: string;
  responseTime: number;
  message: string[];
  Results: {
    series: BlsSeries[];
  };
}

export const BLS_CATEGORIES = [
  { id: 'CUUR0000SAA', name: 'Apparel' },
  { id: 'CUUR0000SAF11', name: 'Food at Home' },
];

export async function fetchBlsData(seriesId: string): Promise<BlsDataPoint[]> {
  const apiKey = import.meta.env.VITE_BLS_API_KEY;
  if (!apiKey) {
    console.warn("No BLS API Key provided, making anonymous request (may be rate limited).");
  }

  // Fetch last 5 years to ensure overlap with user's SKU data
  const currentYear = new Date().getFullYear();
  const startYear = (currentYear - 5).toString();
  const endYear = currentYear.toString();

  const url = new URL(`https://api.bls.gov/publicAPI/v2/timeseries/data/${seriesId}`);
  url.searchParams.append('startyear', startYear);
  url.searchParams.append('endyear', endYear);
  if (apiKey) {
    url.searchParams.append('registrationkey', apiKey);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from BLS API');
  }

  const data: BlsResponse = await response.json();
  
  if (data.status !== 'REQUEST_SUCCEEDED') {
    // If rate limited or invalid key, throw meaningful error
    throw new Error(data.message?.join(', ') || 'BLS API request failed');
  }

  return data.Results.series[0].data;
}
