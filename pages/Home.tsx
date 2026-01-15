
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap, WifiOff, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left side: Content */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 py-12 border-r border-slate-100 z-10 bg-white">
        <div className="flex items-center space-x-3 mb-8">
          <div className="px-2 py-1 bg-emerald-600 text-[10px] font-black text-white rounded uppercase tracking-tighter">System Health: 100%</div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Asset ID: CCC-MOD-V1</span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-6 tracking-tight">
          Modular <br />
          <span className="text-blue-600 font-black">Cold Chain</span>
        </h1>
        
        <p className="text-xl text-slate-500 mb-10 max-w-md font-medium leading-relaxed">
          The world's most resilient solar-powered refrigeration units. Industrial hardware meeting rural agricultural needs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            to="/monitoring"
            className="flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-blue-900/10 group"
          >
            Monitor Live Unit
            <Activity className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
          <Link
            to="/assistant"
            className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20"
          >
            Farmer Assistant
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Technical Capabilities */}
        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-100">
          <div className="flex items-center space-x-3 text-slate-600">
            <WifiOff className="w-5 h-5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-tight">Edge Buffering</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-600">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-tight">PV Autonomous</span>
          </div>
        </div>
      </div>

      {/* Right side: Hardware Image - Visualizing the White Modular Unit */}
      <div className="flex-[1.2] relative bg-slate-200 group overflow-hidden">
        {/* Using a high-quality placeholder that matches the white-container-with-rooftop-solar aesthetic */}
        <img
          src="https://images.unsplash.com/photo-1591193680689-dc0808c10567?auto=format&fit=crop&q=80&w=1600"
          alt="White Modular Solar-Powered Cold Storage Unit"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Gradients and Filters to simulate the professional photography in the uploaded JPG */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply"></div>
        
        {/* Hardware Status HUD */}
        <div className="absolute bottom-12 left-12 md:left-auto md:right-12 bg-white/95 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 max-w-sm ring-1 ring-slate-900/5 transition-all group-hover:translate-y-[-10px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Active Telemetry</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 font-bold">SN: CCC-0089-A</div>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between items-end border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Thermal Core</span>
              <span className="text-2xl font-mono font-bold text-slate-900 tracking-tighter">3.8°C</span>
            </div>
            <div className="flex justify-between items-end border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Array Output</span>
              <span className="text-2xl font-mono font-bold text-slate-900 tracking-tighter">342W</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Comm Buffer</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-full uppercase">Optimal</span>
            </div>
          </div>
        </div>

        {/* Decorative elements representing solar energy flow */}
        <div className="absolute top-12 right-12 flex flex-col items-end space-y-2 pointer-events-none">
          <div className="w-1 h-32 bg-gradient-to-b from-amber-400 to-transparent opacity-50 blur-[1px]"></div>
          <div className="text-[10px] font-black text-white bg-amber-500 px-2 py-1 rounded uppercase tracking-widest shadow-lg">Solar Intake Active</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
