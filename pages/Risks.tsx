
import React from 'react';
import { ShieldAlert, Wrench, Zap, ShieldCheck } from 'lucide-react';

const Risks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">System Reliability & Risk Mitigation</h2>
        <p className="text-slate-600 text-lg">
          Engineering a robust system for the world's most challenging environments requires proactive risk management.
        </p>
      </div>

      <div className="space-y-12">
        {/* Risk 1 */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
          <div className="p-4 bg-amber-50 rounded-2xl shrink-0 h-fit">
            <ShieldAlert className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">High Initial Capital Expenditure</h3>
            <p className="text-slate-600 mb-6">
              The upfront cost of industrial-grade solar and cooling systems can be prohibitive for individual communities.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center text-emerald-700 font-bold mb-3">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Mitigation Strategy
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Phased deployment via the "CCC Hub" model. We establish central hubs funded by regional grants, which then scale into smaller, satellite units as local revenue grows. Bulk procurement of components reduces per-unit costs by 30%.
              </p>
            </div>
          </div>
        </div>

        {/* Risk 2 */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
          <div className="p-4 bg-blue-50 rounded-2xl shrink-0 h-fit">
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Maintenance and Field Service</h3>
            <p className="text-slate-600 mb-6">
              Isolated units are difficult for factory technicians to reach, risking prolonged downtime.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center text-emerald-700 font-bold mb-3">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Mitigation Strategy
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Implementation of a "Train-the-Trainer" program. Every deployment includes certification for two local technicians. All hardware uses standardized connectors and modular bays for "swap-out" repairs that require minimal tools.
              </p>
            </div>
          </div>
        </div>

        {/* Risk 3 */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
          <div className="p-4 bg-indigo-50 rounded-2xl shrink-0 h-fit">
            <Zap className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Power Reliability in Extreme Weather</h3>
            <p className="text-slate-600 mb-6">
              Extended periods of heavy rain or dust storms can reduce solar efficiency below operational thresholds.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center text-emerald-700 font-bold mb-3">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Mitigation Strategy
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                The control unit features "Adaptive Thermal Management." During low-power scenarios, the system automatically prioritizes the core vaccine payload over less sensitive produce, and utilizes passive ice-battery cooling to maintain temperature for up to 72 hours without any power input.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Resilience by Design</h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our commitment to reliability is reflected in our 99.8% uptime goal. Every system is equipped with fail-safe mechanisms and edge-AI monitoring.
        </p>
      </div>
    </div>
  );
};

export default Risks;
