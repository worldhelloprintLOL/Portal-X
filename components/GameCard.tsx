
import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link 
      to={`/game/${game.id}`}
      className="group relative bg-slate-800 rounded-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 shadow-lg"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors truncate pr-2">
            {game.title}
          </h3>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
        <div className="mt-3 inline-block bg-indigo-900/30 text-indigo-400 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">
          {game.category}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <button className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg shadow-xl hover:bg-indigo-500 transition-colors text-sm">
          PLAY NOW
        </button>
      </div>
    </Link>
  );
};

export default GameCard;
