
import React from 'react';
import { useParams } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameCard';

const Categories: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const filteredGames = games.filter(g => g.category === name);

  return (
    <div className="space-y-12">
      <div className="py-12 px-8 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative">
          <h1 className="text-4xl font-black text-white mb-2">{name} Games</h1>
          <p className="text-slate-400">Discover the best unblocked {name?.toLowerCase()} titles on Portal X.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
