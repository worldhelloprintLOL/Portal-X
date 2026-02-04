
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import GameDetail from './pages/GameDetail.tsx';
import Categories from './pages/Categories.tsx';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar onSearch={setSearchQuery} />
        
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/category/:name" element={<Categories />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <div className="bg-indigo-600/20 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-lg font-black tracking-wider text-white">PORTAL X</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                Premium unblocked gaming portal. Fast, reliable, and always free.
              </p>
            </div>
            
            <div className="flex gap-8 text-slate-400 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>

            <div className="text-slate-600 text-xs text-center md:text-right">
              © 2024 Portal X Games. All rights reserved.<br />
              All content provided for educational and entertainment purposes.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
