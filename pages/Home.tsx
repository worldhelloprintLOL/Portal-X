
import React from 'react';
import { Link } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameCard';

interface HomeProps {
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const featuredGame = games.find(g => g.featured) || games[0];
  
  const filteredGames = games.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
          <img 
            src={featuredGame.thumbnail} 
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl gap-4">
            <span className="bg-indigo-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full w-fit uppercase tracking-widest">
              Featured Game
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {featuredGame.title}
            </h1>
            <p className="text-slate-300 text-sm md:text-lg">
              {featuredGame.description}
            </p>
            <div className="flex gap-4 mt-4">
              <Link 
                to={`/game/${featuredGame.id}`}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                Play Now
              </Link>
              <button className="bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95">
                Learn More
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Game Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-indigo-600 rounded-full" />
            {searchQuery ? `Results for "${searchQuery}"` : "Discover Games"}
          </h2>
          {!searchQuery && (
            <div className="flex gap-2">
              <button className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
            <div className="text-slate-500 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-400">No games found</h3>
            <p className="text-slate-600">Try searching for something else!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
