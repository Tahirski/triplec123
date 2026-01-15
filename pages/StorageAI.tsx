
import React, { useState, useRef } from 'react';
import { analyzeProduce } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { Camera, Upload, RefreshCw, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const StorageAI: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await analyzeProduce(image);
      setResult(res);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Intelligent Produce Analysis</h2>
        <p className="text-slate-600">Utilize on-site Computer Vision to assess crop health and optimize storage lifespan.</p>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm flex items-center">
          <Info className="w-4 h-4 mr-2" />
          Note: Analysis results are model-based estimations and should be verified manually.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div className={`relative aspect-square rounded-3xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
            image ? 'border-blue-500 bg-white' : 'border-slate-300 bg-slate-50'
          }`}>
            {image ? (
              <>
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={reset}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="text-slate-900 font-bold mb-1">Capture or Upload</h4>
                <p className="text-sm text-slate-500 mb-6">Support for JPG, PNG</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center mx-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </button>
              </div>
            )}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleFileUpload}
            />
          </div>

          <button
            onClick={runAnalysis}
            disabled={!image || isAnalyzing}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center ${
              !image || isAnalyzing 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Produce...
              </>
            ) : (
              'Run AI Diagnostics'
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 h-fit">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Diagnostic Report</h3>
          
          {!result && !isAnalyzing && !error && (
            <div className="py-20 text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-slate-400 text-sm">Upload an image to generate a diagnostic report.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="space-y-6 animate-pulse">
              <div className="h-4 bg-slate-100 rounded-full w-3/4" />
              <div className="h-4 bg-slate-100 rounded-full w-1/2" />
              <div className="h-24 bg-slate-50 rounded-2xl w-full" />
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Type</div>
                  <div className="text-lg font-bold text-slate-900">{result.fruitType}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">State</div>
                  <div className={`text-lg font-bold flex items-center ${
                    result.freshness === 'Fresh' ? 'text-emerald-600' :
                    result.freshness === 'Near-ripe' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {result.freshness === 'Fresh' ? <CheckCircle2 className="w-5 h-5 mr-1" /> : <AlertCircle className="w-5 h-5 mr-1" />}
                    {result.freshness}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Recommendation</h4>
                <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl text-blue-900 leading-relaxed italic">
                  "{result.recommendation}"
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Model Confidence: {(result.confidence * 100).toFixed(1)}%
                </div>
                <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-500">
                  REF: GEMINI-PRO-VIS-001
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-700 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple icon for placeholder
const Activity = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

export default StorageAI;
