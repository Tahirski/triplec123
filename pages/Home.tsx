import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Zap, WifiOff } from "lucide-react";
import coldUnit from "../assets/cold-unit.jpg";

const Home: React.FC = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-white overflow-hidden">

      {/* LEFT SIDE: CONTENT */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 py-12 border-r border-slate-100 z-10 bg-white">
        <div className="flex items-center space-x-3 mb-8">
          <div className="px-2 py-1 bg-emerald-600 text-[10px] font-black text-white rounded uppercase tracking-tighter">
            System Health: 100%
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Asset ID: CCC-MOD-V1
          </span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-6 tracking-tight">
          Modular <br />
          <span className="text-blue-600 font-black">Cold Chain</span>
        </h1>

        <p className="text-xl text-slate-500 mb-10 max-w-md font-medium leading-relaxed">
          Solar-powered refrigeration units designed for reliable vaccine and
          agricultural storage in rural environments.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            to="/monitoring"
            className="flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl group"
          >
            Monitor Live Unit
            <Activity className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>

          <Link
            to="/assistant"
            className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
          >
            Farmer Assistant
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* TECH CAPABILITIES */}
        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-100">
          <div className="flex items-center space-x-3 text-slate-600">
            <WifiOff className="w-5 h-5 text-indigo-500" />
            <span className="text-xs font-bold uppercase">
              Edge Buffering
            </span>
          </div>
          <div className="flex items-center space-x-3 text-slate-600">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold uppercase">
              PV Autonomous
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: IMAGE + HUD */}
      <div className="flex-[1.2] relative bg-slate-200 overflow-hidden group">
        <img
          src={coldUnit}
          alt="Solar-powered modular cold chain unit deployed in rural farmland"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />

        {/* STATUS HUD */}
        <div className="absolute bottom-12 left-12 md:left-auto md:right-12 bg-white/95 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-white/50 max-w-sm ring-1 ring-slate-900/5 transition-transform group-hover:-translate-y-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest">
                Active Telemetry
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 font-bold">
              SN: CCC-0089-A
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-end border-b pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Thermal Core
              </span>
              <span className="text-2xl font-mono font-bold">
                3.8°C
              </span>
            </div>

            <div className="flex justify-between items-end border-b pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Solar Output
              </span>
              <span className="text-2xl font-mono font-bold">
                342W
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Comm Buffer
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-full uppercase">
                Optimal
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
