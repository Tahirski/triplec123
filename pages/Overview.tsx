
import React, { useState } from 'react';
import { HARDWARE_COMPONENTS } from '../constants';
import { Sun, Battery, Box, Cpu, Thermometer, Info, BrainCircuit, CircuitBoard, Layers, ShieldCheck, WifiOff, Settings2 } from 'lucide-react';

const Overview: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'solar': return <Sun className="w-8 h-8" />;
      case 'battery': return <Battery className="w-8 h-8" />;
      case 'chamber': return <Box className="w-8 h-8" />;
      case 'sensors': return <Thermometer className="w-8 h-8" />;
      case 'control': return <CircuitBoard className="w-8 h-8" />;
      case 'offline-sync': return <WifiOff className="w-8 h-8" />;
      default: return <Info className="w-8 h-8" />;
    }
  };

  const selectedComponent = HARDWARE_COMPONENTS.find(c => c.id === (selectedId || 'control'));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">System Architecture</h2>
          <p className="text-slate-600 font-medium italic">Industrial modular design powered by Arduino Portenta H7 logic.</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-[10px] font-mono font-bold text-slate-400">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>MIL-SPEC INSULATION / ARDUINO EMBEDDED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Technical Schematic Rendering */}
        <div className="lg:col-span-2 relative">
          <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden aspect-[16/10] relative border border-slate-800 shadow-2xl">
            {/* Visualizing the Arduino Board - Technical Close-up */}
            <img 
              src="https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=1600" 
              alt="Arduino Industrial Controller" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen scale-110"
            />
            
            {/* HUD / Schematic Overlay */}
            <div className="absolute inset-0 p-16 flex flex-col justify-between z-20">
              <div className="flex justify-between items-start">
                <button 
                  onClick={() => setSelectedId('solar')}
                  className={`p-5 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 group ${selectedId === 'solar' ? 'bg-blue-600/30 border-blue-500 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/50'}`}
                >
                  <Sun className={`w-8 h-8 transition-colors ${selectedId === 'solar' ? 'text-blue-400' : 'text-white/40 group-hover:text-blue-300'}`} />
                  <span className="block text-[8px] font-black text-white/30 uppercase mt-2 text-center">Power</span>
                </button>

                <button 
                  onClick={() => setSelectedId('battery')}
                  className={`p-5 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 group ${selectedId === 'battery' ? 'bg-emerald-600/30 border-emerald-500 scale-110 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-400/50'}`}
                >
                  <Battery className={`w-8 h-8 transition-colors ${selectedId === 'battery' ? 'text-emerald-400' : 'text-white/40 group-hover:text-emerald-300'}`} />
                  <span className="block text-[8px] font-black text-white/30 uppercase mt-2 text-center">BMS</span>
                </button>
              </div>

              <div className="flex justify-center -mt-8">
                <button 
                  onClick={() => setSelectedId('control')}
                  className={`relative p-12 rounded-[3rem] backdrop-blur-3xl border-2 transition-all duration-700 group ${selectedId === 'control' ? 'bg-amber-600/40 border-amber-400 scale-110 shadow-[0_0_60px_rgba(245,158,11,0.6)]' : 'bg-white/5 border-white/20 hover:border-amber-500/50'}`}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-black text-amber-500 uppercase tracking-[0.3em]">Arduino Core</div>
                  <div className="absolute inset-0 bg-amber-500/10 rounded-[3rem] animate-pulse"></div>
                  <CircuitBoard className={`w-16 h-16 transition-colors ${selectedId === 'control' ? 'text-amber-300' : 'text-white/40 group-hover:text-amber-400'}`} />
                </button>
              </div>

              <div className="flex justify-between items-end">
                <button 
                  onClick={() => setSelectedId('offline-sync')}
                  className={`p-5 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 group ${selectedId === 'offline-sync' ? 'bg-indigo-600/30 border-indigo-500 scale-110 shadow-[0_0_30px_rgba(99,102,241,0.4)]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-400/50'}`}
                >
                  <WifiOff className={`w-8 h-8 transition-colors ${selectedId === 'offline-sync' ? 'text-indigo-400' : 'text-white/40 group-hover:text-indigo-300'}`} />
                  <span className="block text-[8px] font-black text-white/30 uppercase mt-2 text-center">Offline</span>
                </button>

                <button 
                  onClick={() => setSelectedId('chamber')}
                  className={`p-5 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 group ${selectedId === 'chamber' ? 'bg-slate-600/30 border-slate-500 scale-110 shadow-[0_0_30px_rgba(148,163,184,0.4)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <Box className={`w-8 h-8 transition-colors ${selectedId === 'chamber' ? 'text-slate-300' : 'text-white/40'}`} />
                  <span className="block text-[8px] font-black text-white/30 uppercase mt-2 text-center">Unit</span>
                </button>
              </div>
            </div>

            {/* Technical Metadata Overlays */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col space-y-2 opacity-30 font-mono text-[8px] text-slate-500 vertical-text">
              <span>FIRMWARE: VER_3.1.2</span>
              <span>MODEL: CCC_MOD_ALPHA</span>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group hover:border-amber-200 transition-colors">
              <div className="flex items-center space-x-4 mb-5">
                <div className="p-3 bg-amber-50 rounded-2xl">
                  <CircuitBoard className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logic Hub</div>
                  <div className="font-bold text-slate-900">Arduino Portenta Core</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Utilizes the Portenta H7 industrial dual-core to handle real-time PID thermal control loops and asynchronous data buffering simultaneously.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-colors">
              <div className="flex items-center space-x-4 mb-5">
                <div className="p-3 bg-indigo-50 rounded-2xl">
                  <WifiOff className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Connectivity</div>
                  <div className="font-bold text-slate-900">Edge-Ready Firmware</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Integrated PouchDB/IndexedDB local sync ensures zero data loss during network blackouts. Batch-syncs via LoRaWAN when signal available.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Specification Side Panel */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-fit">
          <div className="p-10 bg-slate-950 text-white relative">
            <div className="absolute top-6 right-6 opacity-20"><Settings2 className="w-12 h-12" /></div>
            <div className="flex items-center space-x-5 mb-2">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/40">
                {getIcon(selectedComponent?.id || '')}
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">{selectedComponent?.name}</h3>
                <span className="text-[10px] text-blue-400 font-mono">STATUS: OPTIMAL_RUN</span>
              </div>
            </div>
          </div>
          
          <div className="p-10 space-y-12">
            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Engineering Spec</h4>
              <p className="text-slate-700 leading-relaxed text-sm font-semibold">
                {selectedComponent?.description}
              </p>
            </section>

            <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Parameters</h4>
              <ul className="space-y-5">
                {selectedComponent?.specs.map((spec, i) => (
                  <li key={i} className="flex items-center text-slate-900 text-sm group">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-4 transition-all group-hover:scale-150" />
                    <span className="font-bold tracking-tight">{spec}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="pt-10 border-t border-slate-100 mt-auto">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Self-Diagnostic Result</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal font-medium">
                  Subsystem {selectedComponent?.id.toUpperCase()} reports nominal impedance and thermal equilibrium within expected operational range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
