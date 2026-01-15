
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Dashboard from './pages/Dashboard';
import StorageAI from './pages/StorageAI';
import Impact from './pages/Impact';
import Risks from './pages/Risks';
import OfflineMode from './pages/OfflineMode';
import ChatBot from './pages/ChatBot';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/monitoring" element={<Dashboard />} />
            <Route path="/storage-ai" element={<StorageAI />} />
            <Route path="/offline" element={<OfflineMode />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/risks" element={<Risks />} />
            <Route path="/assistant" element={<ChatBot />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <span>COMMUNITY COLD CHAIN</span>
            </div>
            <div className="text-sm text-slate-500">
              © 2024 Community Cold Chain Initiative. Industrial Grade Systems.
            </div>
            <div className="flex space-x-6 text-sm font-medium text-slate-600">
              <span className="cursor-pointer hover:text-blue-600 transition-colors">Documentation</span>
              <span className="cursor-pointer hover:text-blue-600 transition-colors">API Docs</span>
              <span className="cursor-pointer hover:text-blue-600 transition-colors">Contact Engineering</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
