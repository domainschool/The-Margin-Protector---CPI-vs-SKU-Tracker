import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, TrendingDown, ArrowRight, BookOpen, Activity, Compass, Database, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const [isHoveringPain, setIsHoveringPain] = useState(false);
  const [activeTab, setActiveTab] = useState<'mvp' | 'enterprise'>('mvp');

  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen font-sans overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle mesh/grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-slate-950"></div>
        
        <div className="z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium tracking-wide mb-6 inline-block">
              Strategic Decision-Support
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Auditing Pricing Agility <br/>
              Against <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Macroeconomic Reality</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              The Margin Protector tracks whether your internal price increases are lagging or leading the Consumer Price Index (CPI), securing your bottom line against the silent killer of inflation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/" className="px-8 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Launch Dashboard
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 text-slate-500 flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* 2. The Pain Point Card */}
      <section className="py-32 px-6 max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The Silent Margin Killer</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">In an inflationary environment, selling more units doesn't mean more profit if replacement costs outpace your shelf prices.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/50 p-8 md:p-12 backdrop-blur-sm overflow-hidden group cursor-crosshair"
          onMouseEnter={() => setIsHoveringPain(true)}
          onMouseLeave={() => setIsHoveringPain(false)}
        >
          <div className={`absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent transition-opacity duration-700 ${isHoveringPain ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
                Status Quo Risk <span className="text-xs font-mono font-normal px-2 py-1 bg-slate-800 rounded-md text-slate-400">Hover Card</span>
              </h3>
              <ul className="space-y-6 text-slate-300">
                <li className="flex items-start gap-3">
                  <TrendingDown className={`w-6 h-6 shrink-0 transition-colors ${isHoveringPain ? 'text-red-400' : 'text-slate-500'}`} />
                  <span><strong className="text-white block mb-1">Margin Erosion</strong> A 2% lag in pricing relative to inflation can wipe out 20% of net profit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Database className={`w-6 h-6 shrink-0 transition-colors ${isHoveringPain ? 'text-red-400' : 'text-slate-500'}`} />
                  <span><strong className="text-white block mb-1">Capital Depletion</strong> Inability to replenish stock due to surging replacement costs.</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-72 h-64 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center flex-col z-10 pointer-events-none">
                 <span className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Net Profit Margin</span>
                 <span className={`text-6xl font-mono font-bold transition-all duration-700 ${isHoveringPain ? 'text-red-500 scale-90' : 'text-emerald-400 scale-100'}`}>
                   {isHoveringPain ? '8.4%' : '28.4%'}
                 </span>
                 <span className={`mt-4 text-xs font-bold transition-opacity duration-500 ${isHoveringPain ? 'opacity-100 text-red-500 animate-pulse' : 'opacity-0'}`}>
                   PROFIT LEAK DETECTED
                 </span>
              </div>
              {/* Simulated leak animation when hovered */}
              <motion.div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-red-500/20 to-transparent"
                initial={{ height: '0%' }}
                animate={{ height: isHoveringPain ? '80%' : '0%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. The Secret Sauce Bento Grid */}
      <section className="py-32 px-6 max-w-6xl mx-auto border-t border-slate-800/50">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The Industry Secret Sauce</h2>
          <p className="text-slate-400 max-w-2xl text-lg">Understanding the 'why' behind the numbers. Core domain concepts powering the engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CPI Card */}
          <motion.div whileHover={{ y: -5 }} className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-colors group relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>
            <Activity className="w-10 h-10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-3">Consumer Price Index (CPI)</h3>
            <p className="text-slate-400 leading-relaxed text-lg">A measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services. The ultimate benchmark for purchasing power.</p>
          </motion.div>

          {/* Elasticity Card */}
          <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
            <Compass className="w-10 h-10 text-emerald-400 mb-6 group-hover:rotate-12 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-3">Price Elasticity</h3>
            <p className="text-slate-400 leading-relaxed">The fear factor. Necessities have lower elasticity than discretionary items. Know your threshold.</p>
          </motion.div>

          {/* Replacement Cost Card */}
          <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 transition-colors group">
            <Database className="w-10 h-10 text-amber-400 mb-6 group-hover:-translate-y-1 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-3">Replacement Cost</h3>
            <p className="text-slate-400 leading-relaxed">A product's value is what it costs to buy *today*, not what you paid six months ago.</p>
          </motion.div>

          {/* Indexing Card */}
          <motion.div whileHover={{ y: -5 }} className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors group relative overflow-hidden">
             <div className="absolute right-0 bottom-0 opacity-5 font-mono text-[12rem] font-bold -mb-16 -mr-8 group-hover:opacity-10 transition-opacity">100</div>
            <BarChart3 className="w-10 h-10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-3">Base 100 Indexing</h3>
            <p className="text-slate-400 leading-relaxed text-lg">Setting a "Base Date" (e.g., Jan 2023 = 100) and measuring all subsequent growth relative to that point to ensure an apples-to-apples comparison between inflation and SKU pricing.</p>
          </motion.div>
        </div>
      </section>

      {/* 4. Builder's Blueprint */}
      <section className="py-32 px-6 max-w-4xl mx-auto border-t border-slate-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Builder's Blueprint</h2>
          <p className="text-slate-400 text-lg">Institutional power vs The MVP Strategy.</p>
        </div>

        <div className="flex bg-slate-900 p-1.5 rounded-2xl mb-12 border border-slate-800 w-fit mx-auto relative z-10">
          <button onClick={() => setActiveTab('mvp')} className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'mvp' ? 'bg-slate-800 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-white'}`}>The Vibe-Coded MVP</button>
          <button onClick={() => setActiveTab('enterprise')} className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'enterprise' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105' : 'text-slate-500 hover:text-white'}`}>The Enterprise Standard</button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 backdrop-blur-md min-h-[350px] shadow-2xl relative overflow-hidden">
          {activeTab === 'mvp' && <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/20 rounded-full blur-3xl -mt-20 -mr-20"></div>}
          {activeTab === 'enterprise' && <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mt-20 -mr-20"></div>}
          
          {activeTab === 'mvp' ? (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="space-y-8 relative z-10">
              <div><strong className="text-slate-500 font-mono text-sm uppercase tracking-widest block mb-2">Data Input</strong> <span className="text-2xl text-white font-medium">Manual CSV upload of SKU prices.</span></div>
              <div className="h-px bg-slate-800/80" />
              <div><strong className="text-slate-500 font-mono text-sm uppercase tracking-widest block mb-2">Benchmark</strong> <span className="text-2xl text-white font-medium">National BLS Category Average.</span></div>
              <div className="h-px bg-slate-800/80" />
              <div><strong className="text-slate-500 font-mono text-sm uppercase tracking-widest block mb-2">Output</strong> <span className="text-2xl text-white font-medium">Visual "Margin Alert" Dashboard.</span></div>
              <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-400 italic">Focuses on the Baseline Truth to provide the "Moral Authority" for pricing teams to act immediately.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="space-y-8 relative z-10">
              <div><strong className="text-indigo-400 font-mono text-sm uppercase tracking-widest block mb-2">Data Input</strong> <span className="text-2xl text-white font-medium">Real-time ERP/POS integration.</span></div>
              <div className="h-px bg-slate-800/80" />
              <div><strong className="text-indigo-400 font-mono text-sm uppercase tracking-widest block mb-2">Benchmark</strong> <span className="text-2xl text-white font-medium">Hyper-local, competitor-specific indices.</span></div>
              <div className="h-px bg-slate-800/80" />
              <div><strong className="text-indigo-400 font-mono text-sm uppercase tracking-widest block mb-2">Output</strong> <span className="text-2xl text-white font-medium">Automated price updates sent to ESL.</span></div>
              <div className="mt-8 p-4 bg-indigo-900/10 rounded-xl border border-indigo-500/20">
                <p className="text-sm text-indigo-300 italic">The "Self-Driving System" using predictive AI and cross-elasticity models.</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. Interactive Learning Path */}
      <section className="py-32 px-6 max-w-4xl mx-auto border-t border-slate-800/50">
        <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center">The Aha! Moment</h2>
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-12 pl-8 md:pl-16 space-y-28">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute -left-[43px] md:-left-[75px] top-1 w-8 h-8 rounded-full bg-slate-950 border-4 border-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">From Syntax to Domain</h3>
            <p className="text-slate-400 text-xl leading-relaxed">A "technically perfect" app is useless if it uses the wrong inflation index. Coding the logic of *why* <code className="text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">$1.00</code> today isn't <code className="text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">$1.00</code> yesterday is a fundamental shift in mindset.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute -left-[43px] md:-left-[75px] top-1 w-8 h-8 rounded-full bg-slate-950 border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Cracking the Interview</h3>
            <p className="text-slate-400 text-xl leading-relaxed">Instead of saying "I can use React," you say, "I built a tool that identifies margin erosion by cross-referencing SKU-level pricing data against BLS inflation indices." You are a Business Partner.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute -left-[43px] md:-left-[75px] top-1 w-8 h-8 rounded-full bg-slate-950 border-4 border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Real-World Impact</h3>
            <p className="text-slate-400 text-xl leading-relaxed">You move from building "features" to building "solutions." You are no longer just "coding a chart"; you are "saving a retailer's quarterly margin."</p>
          </motion.div>
        </div>
      </section>

      {/* 6. Footer (Conversion Zone) */}
      <footer className="py-32 px-6 border-t border-slate-800/50 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#3730a3_0%,transparent_50%)] opacity-30"></div>
        
        {/* Glow border effect */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-8 uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            Full-Domain Architect Masterclass
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
            Ready to shift from <br/>
            <span className="text-slate-600 line-through">Full-Stack</span> to Full-Domain?
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Syntax is becoming a commodity. Domain logic is your competitive edge. Join the Domain School to build software that moves markets.
          </p>
          
          <button className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-slate-950 font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            <span className="relative z-10 flex items-center gap-2">Join the Masterclass <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            <div className="absolute inset-0 w-[200%] translate-x-[-100%] bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.1),transparent)] group-hover:animate-[shimmer_1.5s_infinite] z-0 skew-x-[-20deg]"></div>
          </button>
        </div>
      </footer>

    </div>
  );
}
