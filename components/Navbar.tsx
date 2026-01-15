
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { ThermometerSnowflake } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-900 text-white border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ThermometerSnowflake className="text-blue-400 w-8 h-8" />
            <span className="font-bold text-xl tracking-tight">COMMUNITY<span className="text-blue-400">COLDCHAIN</span></span>
          </div>
          <div className="hidden md:flex space-x-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
