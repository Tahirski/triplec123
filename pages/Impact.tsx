
import React from 'react';
import { Leaf, Users, ShieldCheck, DollarSign, Globe, Building2 } from 'lucide-react';

const Impact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Measurable Impact in <br />Resource-Constrained Areas</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Community Cold Chain isn't just a technical solution; it's a social and economic catalyst that transforms local livelihoods.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Reduced Food Waste</h4>
                <p className="text-slate-600">Extending shelf life of seasonal crops from 2 days to over 2 weeks, preventing post-harvest loss.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Improved Vaccine Reliability</h4>
                <p className="text-slate-600">Reliable GAVI-compliant cold storage for vital medicines and infant immunizations.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Economic Stability</h4>
                <p className="text-slate-600">Empowering farmers to wait for better market prices instead of being forced into distress sales.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-900 p-8 rounded-3xl text-white">
            <div className="text-4xl font-bold mb-2">4.2M</div>
            <div className="text-slate-400 text-sm">Tons of CO2e reduced annually through efficiency</div>
          </div>
          <div className="bg-blue-600 p-8 rounded-3xl text-white mt-12">
            <div className="text-4xl font-bold mb-2">35k</div>
            <div className="text-blue-100 text-sm">Communities supported by 2030 roadmap</div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200">
            <div className="text-4xl font-bold text-slate-900 mb-2">3x</div>
            <div className="text-slate-500 text-sm">Average increase in farmer net profit</div>
          </div>
          <div className="bg-slate-100 p-8 rounded-3xl mt-12">
            <div className="text-4xl font-bold text-slate-900 mb-2">99%</div>
            <div className="text-slate-500 text-sm">Vaccine thermal compliance rate</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Deployment & Sustainable Business Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <DollarSign className="w-10 h-10 text-emerald-600 mb-6" />
            <h4 className="text-xl font-bold text-slate-900 mb-4">Pay-Per-Use (Farmers)</h4>
            <p className="text-slate-600 mb-6">Micro-leasing model allowing smallholders to pay for storage by volume or weight per day.</p>
            <ul className="text-sm text-slate-500 space-y-2">
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Digital Wallet Integration</li>
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Season-aligned billing</li>
            </ul>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Building2 className="w-10 h-10 text-blue-600 mb-6" />
            <h4 className="text-xl font-bold text-slate-900 mb-4">Subscription (Clinics)</h4>
            <p className="text-slate-600 mb-6">Tiered subscription for healthcare providers with guaranteed thermal logging and emergency priority.</p>
            <ul className="text-sm text-slate-500 space-y-2">
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" /> Compliance reporting</li>
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" /> 24/7 technical support</li>
            </ul>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Globe className="w-10 h-10 text-indigo-600 mb-6" />
            <h4 className="text-xl font-bold text-slate-900 mb-4">G2B Partnerships</h4>
            <p className="text-slate-600 mb-6">Collaborations with NGOs and Local Governments for infrastructure roll-out and logistics.</p>
            <ul className="text-sm text-slate-500 space-y-2">
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Infrastructure grants</li>
              <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Training programs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default Impact;
