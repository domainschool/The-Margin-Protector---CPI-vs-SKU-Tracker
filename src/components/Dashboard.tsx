import { useMemo } from 'react';
import { AlertTriangle, DollarSign, Lightbulb } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NormalizedDataPoint } from '../utils/normalizeToIndex';
import { BlsDataPoint } from '../services/blsApi';
import { SkuDataPoint } from '../hooks/useSkuProcessor';

interface DashboardProps {
  normalizedData: NormalizedDataPoint[];
  blsData: BlsDataPoint[] | null;
  skuData: SkuDataPoint[] | null;
}

export function Dashboard({ normalizedData, blsData, skuData }: DashboardProps) {
  const kpis = useMemo(() => {
    if (normalizedData.length < 2) return null;

    const last = normalizedData[normalizedData.length - 1];

    const currentInflation = last.cpiIndex ? last.cpiIndex - 100 : 0;
    const currentPriceGrowth = last.skuIndex ? last.skuIndex - 100 : 0;
    const marginDelta = last.marginDelta || 0;

    return {
      currentInflation: currentInflation.toFixed(2),
      currentPriceGrowth: currentPriceGrowth.toFixed(2),
      marginDelta: marginDelta.toFixed(2),
      isAlert: marginDelta < -2.0,
    };
  }, [normalizedData]);

  const insights = useMemo(() => {
    if (!kpis) return [];
    
    const delta = Number(kpis.marginDelta);
    const bullets = [];
    
    if (delta < 0) {
      bullets.push(`Your pricing is currently ${Math.abs(delta).toFixed(1)}% behind the national average inflation rate for this category.`);
      
      if (delta < -2.0) {
        bullets.push(`Critical Margin Erosion: To maintain your historical profit margins, consider an immediate price adjustment of at least +${Math.abs(delta).toFixed(1)}% across your SKU portfolio.`);
      } else {
        bullets.push(`Warning: You are beginning to absorb inflation costs. Monitor these SKUs closely over the next quarter.`);
      }
    } else if (delta > 0) {
      bullets.push(`Strong Pricing Power: Your SKU pricing is currently outpacing inflation by ${delta.toFixed(1)}%.`);
      if (delta > 5.0) {
        bullets.push(`Opportunity: While margins are robust, ensure your prices remain competitive within the market to avoid volume drop-off.`);
      } else {
        bullets.push(`Your margin integrity is fully protected against current macroeconomic headwinds.`);
      }
    } else {
      bullets.push(`Your pricing is exactly matched with the macroeconomic inflation benchmark.`);
      bullets.push(`Maintain current pricing strategy, but prepare for future volatility.`);
    }

    if (skuData && skuData.length > 0) {
       const latestPrice = skuData[skuData.length - 1].price;
       if (delta < 0) {
         const recommendedPrice = latestPrice * (1 + (Math.abs(delta) / 100));
         bullets.push(`Recommended Target Price: Adjusting your average SKU price from $${latestPrice.toFixed(2)} to $${recommendedPrice.toFixed(2)} would restore your margin baseline.`);
       }
    }

    return bullets;
  }, [kpis, skuData]);

  if (!blsData || !skuData || normalizedData.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
        <DollarSign className="w-12 h-12 mb-4 opacity-50" />
        <h2 className="text-xl font-semibold mb-2">Awaiting Data</h2>
        <p className="text-sm text-center max-w-md">
          Please select a macroeconomic category and upload your internal SKU pricing data to visualize your margin integrity.
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const cpi = payload.find((p: any) => p.dataKey === 'cpiIndex')?.value;
      const sku = payload.find((p: any) => p.dataKey === 'skuIndex')?.value;
      const delta = sku && cpi ? (sku - cpi).toFixed(2) : '0.00';
      
      return (
        <div className="bg-slate-900 text-slate-50 p-4 rounded-xl border border-slate-700 shadow-xl text-sm">
          <p className="font-semibold text-slate-300 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Market Inflation (CPI):</span>
              <span className="font-mono">{cpi?.toFixed(2)}</span>
            </p>
            <p className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Internal SKU Index:</span>
              <span className="font-mono">{sku?.toFixed(2)}</span>
            </p>
            <div className="h-px bg-slate-700 my-2" />
            <p className="flex items-center justify-between gap-4 font-semibold">
              <span className="text-slate-400">Margin Delta:</span>
              <span className={`font-mono ${Number(delta) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {Number(delta) > 0 ? '+' : ''}{delta}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Inflation Rate</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">+{kpis?.currentInflation}%</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Your Price Growth</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">+{kpis?.currentPriceGrowth}%</span>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border shadow-sm relative overflow-hidden transition-all duration-300 ${
          kpis?.isAlert 
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-pulse' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          {kpis?.isAlert && (
            <div className="absolute top-0 right-0 p-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          )}
          <p className={`text-sm font-medium ${kpis?.isAlert ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
            Margin Integrity Score
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${kpis?.isAlert ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
              {Number(kpis?.marginDelta) > 0 ? '+' : ''}{kpis?.marginDelta}%
            </span>
          </div>
          {kpis?.isAlert && (
            <p className="mt-2 text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
              ACTION REQUIRED: Margin Erosion Detected
            </p>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-200">Growth Comparison Index (Base 100)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={normalizedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSku" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={kpis?.isAlert ? '#ef4444' : '#10b981'} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={kpis?.isAlert ? '#ef4444' : '#10b981'} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCpi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} minTickGap={30} />
              <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={12} tickFormatter={(val) => val.toFixed(0)} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="cpiIndex" 
                stroke="#64748b" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#colorCpi)" 
                name="cpiIndex"
              />
              <Area 
                type="monotone" 
                dataKey="skuIndex" 
                stroke={kpis?.isAlert ? '#ef4444' : '#10b981'} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSku)" 
                name="skuIndex"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Business Insights Panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" /> Executive Insights
        </h3>
        <ul className="space-y-3">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <p>{insight}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
