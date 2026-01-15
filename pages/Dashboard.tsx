
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockBackend } from '../services/mockBackend';
import { getStorageRecommendations } from '../services/geminiService';
import { SystemMetrics, SystemStatus } from '../types';
import { Thermometer, Droplets, Battery, AlertTriangle, CheckCircle, Clock, Sparkles, ChevronRight, ListChecks } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics[]>([]);
  const [status, setStatus] = useState<{ status: SystemStatus; activeAlerts: string[] }>({
    status: SystemStatus.OPTIMAL,
    activeAlerts: []
  });
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const fetchAllData = async () => {
    const [m, s] = await Promise.all([
      mockBackend.getMetrics(),
      mockBackend.getCurrentStatus()
    ]);
    setMetrics(m);
    setStatus(s);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(() => {
      mockBackend.updateSensorData();
      fetchAllData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lastTemp = metrics[metrics.length - 1]?.temperature;
    if (lastTemp !== undefined) {
      getStorageRecommendations(lastTemp).then(setRecommendations);
    }
  }, [loading]);

  const current = metrics[metrics.length - 1];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Live Telemetry Dashboard</h2>
            <p className="text-slate-500 text-sm flex items-center mt-1">
              <Clock className="w-4 h-4 mr-1" />
              Active System Log • Refreshing 5.0s
            </p>
          </div>
          
          <div className={`px-6 py-3 rounded-2xl border flex items-center space-x-3 shadow-sm ${
            status.status === SystemStatus.OPTIMAL ? 'bg-green-50 border-green-200 text-green-700' :
            status.status === SystemStatus.WARNING ? 'bg-amber-50 border-amber-200 text-amber-700' :
            'bg-red-50 border-red-200 text-red-700'
          }`}>
            {status.status === SystemStatus.OPTIMAL ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            <div>
              <div className="text-xs uppercase font-bold tracking-widest opacity-60">System Health</div>
              <div className="text-lg font-bold">{status.status}</div>
            </div>
          </div>
        </div>

        {/* Gemini AI Recommendations Section */}
        <div className="mb-10 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Sparkles className="w-40 h-40" />
          </div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">AI Unit Recommendations</h3>
          </div>
          <p className="text-slate-500 text-sm mb-8 font-medium italic">Based on current unit temperature of {current?.temperature.toFixed(1)}°C:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {recommendations.length > 0 ? recommendations.map((rec, i) => (
              <div key={i} className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col justify-between hover:border-blue-300 transition-colors group">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-900">{rec.name}</span>
                    <span className="text-[10px] font-mono text-blue-600 font-bold">{rec.tempRange}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">"{rec.benefit}"</div>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Stay Duration</span>
                  <span className="text-xs font-black text-blue-700">{rec.days}</span>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-12 text-center text-slate-400 font-medium animate-pulse italic">
                Generating smart recommendations for current thermal profile...
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Thermometer className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400">CORE_TEMP_S1</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{current?.temperature.toFixed(1)}°C</div>
            <div className="text-sm text-slate-500 mb-4">Storage Environment</div>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[42%]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400">HUMID_S2</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{current?.humidity.toFixed(0)}%</div>
            <div className="text-sm text-slate-500 mb-4">Atmospheric Moisture</div>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[82%]" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Battery className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400">BATT_BANK_A</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{current?.batteryLevel.toFixed(1)}%</div>
            <div className="text-sm text-slate-500 mb-4">Battery State of Charge</div>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${current?.batteryLevel > 20 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${current?.batteryLevel}%` }} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Thermal History (24h Window)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Moisture Stability</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="stepAfter" dataKey="humidity" stroke="#6366f1" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
