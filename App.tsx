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

// --- Full Game Database ---
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
  },
  {
    id: 'gravity-flip',
    title: 'Gravity Flip',
    description: 'Challenge physics in this platformer where gravity is just a suggestion.',
    thumbnail: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Puzzle
  },
  {
    id: 'hoop-star',
    title: 'Hoop Star',
    description: 'Master the court and become the ultimate basketball legend.',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Sports
  },
  {
    id: 'tank-wars',
    title: 'Steel Titans',
    description: 'Heavy metal combat. Control a fleet of tanks in explosive battlefields.',
    thumbnail: 'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?auto=format&fit=crop&q=80&w=800',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Action
  }
];

// --- Components ---

const Navbar = ({ onSearch }: { onSearch: (q: string) => void }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Portal X</span>
        </Link>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search for games..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all text-white placeholder-slate-600 shadow-inner"
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
  <Link to={`/game/${game.id}`} className="group relative bg-slate-900 rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-300 border border-slate-800 hover:border-indigo-500/50 shadow-2xl">
    <div className="aspect-[4/3] w-full overflow-hidden">
      <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
    </div>
    <div className="p-5">
      <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors truncate mb-1 text-lg">{game.title}</h3>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{game.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="bg-indigo-950 text-indigo-400 text-[10px] px-2.5 py-1 rounded-full uppercase font-black tracking-wider border border-indigo-500/10">
          {game.category}
        </span>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
      <div className="w-full bg-indigo-600 text-white text-center font-black py-3 rounded-xl text-sm shadow-xl shadow-indigo-600/30">PLAY NOW</div>
    </div>
  </Link>
);

const Home = ({ searchQuery }: { searchQuery: string }) => {
  const filtered = games.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.category.toLowerCase().includes(searchQuery.toLowerCase()));
  const featured = games.find(g => g.featured) || games[0];
  
  return (
    <div className="space-y-16">
      {!searchQuery && (
        <section className="relative h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden group shadow-2xl">
          <img src={featured.thumbnail} alt="Hero" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 max-w-3xl gap-6">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/20 w-fit">Featured Entry</span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">{featured.title}</h1>
            <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-lg">{featured.description}</p>
            <Link to={`/game/${featured.id}`} className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-indigo-600/20 hover:-translate-y-1 active:scale-95 text-lg w-fit">Play Now</Link>
          </div>
        </section>
      )}
      <section>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-4 mb-10">
          <div className="w-2.5 h-10 bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/20" />
          {searchQuery ? `Results for "${searchQuery}"` : "Discover More"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map(game => <GameCard key={game.id} game={game} />)}
          {filtered.length === 0 && <div className="col-span-full text-center py-32 text-slate-500 font-bold text-xl uppercase tracking-widest">No games found...</div>}
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
  
  if (!game) return <div className="text-center py-20 text-white font-black text-3xl">GAME NOT FOUND</div>;
  
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className={`relative bg-black rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl transition-all duration-500 ${full ? 'fixed inset-0 z-[60] rounded-none' : 'aspect-video ring-1 ring-slate-800/50'}`}>
        <iframe src={game.url} className="w-full h-full border-0" title={game.title} allowFullScreen />
        <button onClick={() => setFull(!full)} className="absolute top-6 right-6 bg-slate-950/70 hover:bg-slate-950 backdrop-blur-md text-white p-3 rounded-2xl z-10 transition-all border border-slate-800/50">
          {full ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>}
        </button>
      </div>
      <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">{game.title}</h1>
          <span className="px-3 py-1 bg-indigo-950 text-indigo-400 text-xs font-black rounded-lg border border-indigo-500/20 mt-2 inline-block uppercase tracking-widest">{game.category}</span>
        </div>
        <Link to="/" className="text-slate-500 font-black uppercase text-sm hover:text-white transition-colors">Return to Home</Link>
      </div>
      <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl">
        <h2 className="text-xl font-black text-white mb-4 uppercase tracking-wider">Description</h2>
        <p className="text-slate-400 leading-relaxed font-medium">{game.description}</p>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { name } = useParams();
  const filtered = games.filter(g => g.category === name);
  return (
    <div className="space-y-12">
      <div className="py-16 px-10 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] shadow-2xl">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase">{name} Games</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(game => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-400">
      <Navbar onSearch={setSearch} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-10 md:py-16">
        <Routes>
          <Route path="/" element={<Home searchQuery={search} />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-900 bg-slate-950 py-16 px-6 mt-20 text-center text-slate-700 text-xs font-bold uppercase tracking-widest">
        © 2024 Portal X Universe • Secure Unblocked Node
      </footer>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<Router><App /></Router>);
}