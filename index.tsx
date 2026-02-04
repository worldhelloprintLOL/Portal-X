
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// --- Types ---
enum Category {
  Action = 'Action',
  Puzzle = 'Puzzle',
  Sports = 'Sports',
  Arcade = 'Arcade',
  Strategy = 'Strategy',
  Retro = 'Retro'
}

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: Category;
  featured?: boolean;
}

// --- Data ---
const games: Game[] = [
  {
    id: 'space-invaders',
    title: 'Void Runner',
    description: 'Dodge asteroids and survive the deep space vacuum in this high-intensity arcade runner.',
    thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Arcade,
    featured: true
  },
  {
    id: 'block-puzzle',
    title: 'Neon Blocks',
    description: 'A mind-bending puzzle game where you arrange geometric shapes to clear lines.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Puzzle
  },
  {
    id: 'pixel-quest',
    title: 'Pixel Quest',
    description: 'Embark on a nostalgic 8-bit adventure through dungeons and mystical forests.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Retro,
    featured: true
  },
  {
    id: 'fast-track',
    title: 'Fast Track 3D',
    description: 'Burn rubber and drift around corners in this ultra-fast street racing simulation.',
    thumbnail: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Sports
  },
  {
    id: 'fort-defense',
    title: 'Fortress Defense',
    description: 'Tactical tower defense. Build, upgrade, and protect your kingdom from invaders.',
    thumbnail: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Strategy
  },
  {
    id: 'cyber-clash',
    title: 'Cyber Clash',
    description: 'Fast-paced multiplayer action set in a neon-lit cyberpunk arena.',
    thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Action
  }
];

// --- Components ---

const Navbar = ({ onSearch }: { onSearch: (q: string) => void }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white uppercase">Portal X</span>
        </Link>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search for games..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all text-white"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-400 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {Object.values(Category).map((cat) => (
            <Link key={cat} to={`/category/${cat}`} className="hover:text-white whitespace-nowrap transition-colors">{cat}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const GameCard = ({ game }: { game: Game }) => (
  <Link to={`/game/${game.id}`} className="group relative bg-slate-800 rounded-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 shadow-lg">
    <div className="aspect-[4/3] w-full overflow-hidden">
      <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
    </div>
    <div className="p-4">
      <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors truncate mb-1">{game.title}</h3>
      <p className="text-xs text-slate-400 line-clamp-2">{game.description}</p>
      <div className="mt-3 inline-block bg-indigo-900/30 text-indigo-400 text-[10px] px-2 py-1 rounded uppercase font-bold">{game.category}</div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
      <div className="w-full bg-indigo-600 text-white text-center font-bold py-2 rounded-lg text-sm">PLAY NOW</div>
    </div>
  </Link>
);

const Home = ({ searchQuery }: { searchQuery: string }) => {
  const filtered = games.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.category.toLowerCase().includes(searchQuery.toLowerCase()));
  const featured = games.find(g => g.featured) || games[0];
  
  return (
    <div className="space-y-12">
      {!searchQuery && (
        <section className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
          <img src={featured.thumbnail} alt="Hero" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl gap-4">
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit uppercase tracking-widest">Featured Game</span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">{featured.title}</h1>
            <p className="text-slate-300 text-sm md:text-lg">{featured.description}</p>
            <div className="flex gap-4 mt-4">
              <Link to={`/game/${featured.id}`} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">Play Now</Link>
            </div>
          </div>
        </section>
      )}
      <section>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">
          <span className="w-2 h-8 bg-indigo-600 rounded-full" />
          {searchQuery ? `Results for "${searchQuery}"` : "Discover Games"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(game => <GameCard key={game.id} game={game} />)}
          {filtered.length === 0 && <div className="col-span-full text-center py-20 text-slate-500 text-xl font-bold">No games found...</div>}
        </div>
      </section>
    </div>
  );
};

const GameDetail = () => {
  const { id } = useParams();
  const game = games.find(g => g.id === id);
  const [full, setFull] = useState(false);
  useEffect(() => window.scrollTo(0, 0), [id]);
  
  if (!game) return <div className="text-center py-20 text-white">Game not found</div>;
  
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className={`relative bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl ${full ? 'fixed inset-0 z-[60] rounded-none' : 'aspect-video'}`}>
            <iframe src={game.url} className="w-full h-full border-0" title={game.title} allowFullScreen />
            {full && (
              <button onClick={() => setFull(false)} className="absolute top-4 right-4 bg-slate-900/50 hover:bg-slate-900 text-white p-2 rounded-full z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          <div className="flex items-center justify-between p-6 bg-slate-800 rounded-2xl border border-slate-700">
            <h1 className="text-3xl font-black text-white">{game.title}</h1>
            <button onClick={() => setFull(true)} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </button>
          </div>
          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">About</h2>
            <p className="text-slate-400 leading-relaxed">{game.description}</p>
          </div>
        </div>
        <aside className="w-full lg:w-80 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><span className="w-1.5 h-6 bg-indigo-500 rounded-full" />More Games</h2>
          {games.filter(g => g.id !== id).slice(0, 5).map(g => (
            <Link key={g.id} to={`/game/${g.id}`} className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all">
              <img src={g.thumbnail} alt={g.title} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0"><h4 className="font-bold text-white truncate text-sm">{g.title}</h4><p className="text-xs text-slate-500">{g.category}</p></div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { name } = useParams();
  const filtered = games.filter(g => g.category === name);
  return (
    <div className="space-y-12">
      <div className="py-12 px-8 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl relative overflow-hidden">
        <h1 className="text-4xl font-black text-white mb-2">{name} Games</h1>
        <p className="text-slate-400">The best unblocked {name?.toLowerCase()} titles.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(game => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState('');
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar onSearch={setSearch} />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<Home searchQuery={search} />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/category/:name" element={<CategoryPage />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-600 text-sm text-center md:text-left">
            <div><span className="text-white font-black tracking-widest uppercase">Portal X</span><p>Premium unblocked gaming.</p></div>
            <div className="flex gap-8"><a href="#" className="hover:text-slate-400 transition-colors">Privacy</a><a href="#" className="hover:text-slate-400 transition-colors">Terms</a><a href="#" className="hover:text-slate-400 transition-colors">Discord</a></div>
            <div>© 2024 Portal X. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<React.StrictMode><App /></React.StrictMode>);
}
