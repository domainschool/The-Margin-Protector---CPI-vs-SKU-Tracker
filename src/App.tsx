import { useState, useEffect, useRef, useMemo } from 'react';
import { Moon, Sun, TrendingUp, Settings, BarChart2, UploadCloud, ChevronDown, Loader2 } from 'lucide-react';
import { BLS_CATEGORIES, fetchBlsData, BlsDataPoint } from './services/blsApi';
import { useSkuProcessor } from './hooks/useSkuProcessor';
import { normalizeToIndex } from './utils/normalizeToIndex';
import { Dashboard } from './components/Dashboard';
import { Link } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  // Data Acquisition State
  const [selectedCategory, setSelectedCategory] = useState(BLS_CATEGORIES[0].id);
  const [blsData, setBlsData] = useState<BlsDataPoint[] | null>(null);
  const [isLoadingBls, setIsLoadingBls] = useState(false);
  const [blsError, setBlsError] = useState<string | null>(null);
  
  const { skuData, error: skuError, processFile } = useSkuProcessor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // The Domain Logic: Calculate Base 100 Indexes
  const normalizedData = useMemo(() => {
    return normalizeToIndex(blsData, skuData);
  }, [blsData, skuData]);

  // Theme Management
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch BLS Data when category changes
  useEffect(() => {
    async function loadBlsData() {
      setIsLoadingBls(true);
      setBlsError(null);
      try {
        const data = await fetchBlsData(selectedCategory);
        setBlsData(data);
      } catch (err: any) {
        setBlsError(err.message || 'Failed to fetch BLS data');
      } finally {
        setIsLoadingBls(false);
      }
    }
    loadBlsData();
  }, [selectedCategory]);

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-200">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Margin Protector</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Macroeconomic Pricing Intelligence</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Controls */}
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Controls
            </h2>
            
            {/* BLS Category Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Macroeconomic Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg py-2.5 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  disabled={isLoadingBls}
                >
                  {BLS_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.id})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                  {isLoadingBls ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              {blsError && <p className="text-xs text-red-500 mt-1">{blsError}</p>}
            </div>

            {/* SKU Upload Zone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Internal SKU Data (CSV)
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-colors ${
                  isDragging 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' 
                    : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <UploadCloud className={`w-8 h-8 mb-2 ${isDragging ? 'text-indigo-500' : 'text-slate-400'}`} />
                <p className="text-sm text-center font-medium text-slate-600 dark:text-slate-300">
                  {skuData ? 'Data Loaded Successfully' : 'Drag & drop CSV'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {skuData ? `${skuData.length} records parsed` : 'or click to browse'}
                </p>
              </div>
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
              />
              {skuError && <p className="text-xs text-red-500 mt-1">{skuError}</p>}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-200">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <BarChart2 className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Financial Dashboard</h2>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-sm font-semibold text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
              About the Project
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <Dashboard 
            normalizedData={normalizedData} 
            blsData={blsData} 
            skuData={skuData} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;
