
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameCard';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!game) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Game not found</h2>
        <Link to="/" className="text-indigo-500 mt-4 inline-block hover:underline">Return Home</Link>
      </div>
    );
  }

  const recommendations = games.filter(g => g.id !== id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Game Section */}
        <div className="flex-1 space-y-6">
          <div className={`relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 ${isFullScreen ? 'fixed inset-0 z-[60] rounded-none' : 'aspect-video'}`}>
            <iframe 
              src={game.url}
              className="w-full h-full border-0"
              title={game.title}
              allowFullScreen
            />
            {isFullScreen && (
              <button 
                onClick={() => setIsFullScreen(false)}
                className="absolute top-4 right-4 bg-slate-900/50 hover:bg-slate-900 text-white p-2 rounded-full transition-colors z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-lg">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-white">{game.title}</h1>
              <div className="flex items-center gap-4">
                <span className="text-indigo-400 font-bold text-sm">{game.category}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsFullScreen(true)}
                className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                title="Fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">About this game</h2>
            <p className="text-slate-400 leading-relaxed">
              {game.description} Immerse yourself in the action, master the controls, and reach for high scores in {game.title}. This unblocked version features the full gameplay experience with no restrictions.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
            Recommended
          </h2>
          <div className="flex flex-col gap-4">
            {recommendations.map(g => (
              <Link 
                key={g.id} 
                to={`/game/${g.id}`}
                className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
              >
                <img src={g.thumbnail} alt={g.title} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white truncate text-sm">{g.title}</h4>
                  <p className="text-xs text-slate-500 mb-1">{g.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
