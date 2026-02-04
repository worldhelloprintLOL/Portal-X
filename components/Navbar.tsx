
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Category } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            PORTAL X
          </span>
        </Link>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search for games..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-400 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {Object.values(Category).map((cat) => (
            <Link 
              key={cat} 
              to={`/category/${cat}`}
              className="hover:text-white whitespace-nowrap transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
