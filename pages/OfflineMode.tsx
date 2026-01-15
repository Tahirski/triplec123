
import React, { useState } from 'react';
import { WifiOff, Database, SignalHigh, CheckCircle, ToggleLeft, ToggleRight, List, Cpu, ShieldAlert, Sparkles } from 'lucide-react';

const OfflineMode: React.FC = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const mockLogs = [
    { time: "2024-05-15 08:42:01", event: "SENSOR_READ", data: "TEMP: 3.8C, HUM: 82%", status: "CACHED" },
    { time: "2024-05-15 08:45:12", event: "ARDUINO_HB", data: "CORE_01_OK", status: "CACHED" },
    { time: "2024-05-15 08:50:00", event: "AI_DIAG", data: "TOMATO_EST_12D", status: "BUFFERED" },
    { time: "2024-05-15 09:00:22", event: "POWER_POLL", data: "PV: 340W, BAT: 92%", status: "BUFFERED" },
    { time: "2024-05-15 09:15:05", event: "LORA_PING", data: "P2P_MESH_SEARCH", status: "WAITING" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-blue-600 font-bold mb-4 uppercase tracking-widest text-sm">
            <WifiOff className="w-5 h-5" />
            <span>Edge Resilience Hub</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight uppercase tracking-tight">
            Resilient Field <br />Operations
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Manage system behavior in disconnected environments. Our Edge architecture buffers all telemetry locally on the hardware.
          </p>

          <div className={`p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 border-2 ${isOfflineMode ? 'bg-slate-900 border-blue-500/30 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl ${isOfflineMode ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-100 text-slate-500'}`}>
                  <Cpu className="w-8 h-8" />
                </div>
                <div>
                  <div className={`font-black text-xl tracking-tight uppercase ${isOfflineMode ? 'text-white' : 'text-slate-900'}`}>Offline Mode</div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${isOfflineMode ? 'text-blue-400' : 'text-slate-400'}`}>
                    {isOfflineMode ? 'Storage Active' : 'Real-time Streaming'}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOfflineMode(!isOfflineMode)}
                className="focus:outline-none transition-transform active:scale-90"
              >
                {isOfflineMode ? (
                  <ToggleRight className="w-16 h-16 text-blue-500" />
                ) : (
                  <ToggleLeft className="w-16 h-16 text-slate-200" />
                )}
              </button>
            </div>
            
            <p className={`text-sm leading-relaxed font-medium ${isOfflineMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {isOfflineMode 
                ? "Unit is currently operating in isolation. All sensor logs are being committed to the internal 128GB high-speed buffer. Handshake with cloud is paused." 
                : "Unit is attempting real-time heartbeat synchronization with the central dashboard via available 4G/LoRa links."}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Database className="w-24 h-24" />
            </div>
            <div className="flex items-end justify-between mb-4">
              <div className="font-black text-slate-900 uppercase text-[10px] tracking-[0.2em]">Unit Storage Capacity</div>
              <div className="text-blue-600 font-black text-xs">94.2% AVAILABLE</div>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-[5.8%] transition-all duration-1000"></div>
            </div>
            <div className="mt-4 flex justify-between text-[10px] font-mono font-bold text-slate-400">
              <span>LOCAL_CACHE: 7.42 GB</span>
              <span>SSD_LIMIT: 128 GB</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
              <SignalHigh className="w-8 h-8 text-blue-400 mb-4" />
              <div className="font-black uppercase text-xs tracking-widest mb-1">LoRa Mesh</div>
              <div className="text-[10px] font-mono text-slate-500 font-bold">READY_TO_SYNC</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <CheckCircle className="w-8 h-8 text-emerald-500 mb-4" />
              <div className="font-black uppercase text-xs tracking-widest mb-1">Data Health</div>
              <div className="text-[10px] font-mono text-slate-400 font-bold">SHA_VERIFIED</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-slate-50 border border-slate-200 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-6">
          <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl">
            <List className="w-8 h-8" />
          </div>
          <div>
            <div className="font-black text-slate-900 uppercase tracking-tight text-lg">Local Log Explorer</div>
            <div className="text-sm text-slate-500 font-medium">Inspect raw hexadecimal and telemetry packets stored in the hardware buffer.</div>
          </div>
        </div>
        <button 
          onClick={() => setShowLogs(!showLogs)}
          className={`px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-xl ${showLogs ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
        >
          {showLogs ? 'Close Explorer' : 'Open Buffer Log'}
        </button>
      </div>

      {showLogs && (
        <div className="mt-8 bg-slate-950 rounded-[3rem] border border-slate-800 shadow-2xl p-10 animate-in slide-in-from-top-4 duration-700 overflow-hidden">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
            <div className="flex items-center space-x-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-mono text-sm uppercase tracking-[0.4em]">Hardware_Buffer_Dump</h4>
            </div>
            <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20 rounded-full font-bold">STATUS: STREAMING_LOCAL</div>
          </div>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-6 custom-scrollbar">
            {mockLogs.map((log, i) => (
              <div key={i} className="group flex items-start space-x-8 py-5 border-b border-white/5 hover:bg-white/5 transition-all px-6 rounded-2xl">
                <span className="text-slate-600 font-mono text-[10px] w-40 shrink-0 font-bold">{log.time}</span>
                <span className="text-blue-400 font-black font-mono text-xs w-32 uppercase shrink-0">[{log.event}]</span>
                <span className="text-slate-300 font-mono text-xs flex-1 truncate">0xFA72_{log.data}</span>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${log.status === 'CACHED' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center text-slate-500 space-x-2">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encryption Active (AES-256)</span>
            </div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-not-allowed opacity-50">
              Clear Local Buffer (Physical Reset Only)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineMode;
