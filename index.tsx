
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
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
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
        <span className="bg-indigo-900/30 text-indigo-400 text-[10px] px-2.5 py-1 rounded-full uppercase font-black tracking-wider border border-indigo-500/10">
          {game.category}
        </span>
        <span className="text-slate-600 group-hover:text-indigo-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
            <div className="flex items-center gap-3">
              <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/20">Featured Entry</span>
              <div className="h-[1px] w-12 bg-indigo-500/30" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              {featured.title}
            </h1>
            <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-lg">
              {featured.description}
            </p>
            <div className="flex gap-4 mt-4">
              <Link to={`/game/${featured.id}`} className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-indigo-600/20 hover:-translate-y-1 active:scale-95 text-lg">
                Play Now
              </Link>
            </div>
          </div>
        </section>
      )}
      
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
            <div className="w-2.5 h-10 bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/20" />
            {searchQuery ? `Results for "${searchQuery}"` : "Discover More"}
          </h2>
          {!searchQuery && (
             <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                <span>View All</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map(game => <GameCard key={game.id} game={game} />)}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-32 rounded-[2rem] bg-slate-900/50 border border-slate-800/50 border-dashed">
              <div className="text-slate-700 text-6xl mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-500">No games found...</h3>
              <p className="text-slate-600 mt-2">Try adjusting your search filters.</p>
            </div>
          )}
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
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          <div className={`relative bg-black rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl transition-all duration-500 ${full ? 'fixed inset-0 z-[60] rounded-none' : 'aspect-video ring-1 ring-slate-800/50'}`}>
            <iframe src={game.url} className="w-full h-full border-0" title={game.title} allowFullScreen />
            <div className="absolute top-6 right-6 flex gap-3">
              <button onClick={() => setFull(!full)} className="bg-slate-950/70 hover:bg-slate-950 backdrop-blur-md text-white p-3 rounded-2xl z-10 transition-all border border-slate-800/50">
                {full ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">{game.title}</h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-indigo-950 text-indigo-400 text-xs font-black rounded-lg border border-indigo-500/20">{game.category}</span>
                <span className="text-slate-500 text-sm font-medium">Ver. 1.0.4 • 60 FPS</span>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                Like
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl">
              <h2 className="text-xl font-black text-white mb-4 uppercase tracking-wider">Description</h2>
              <p className="text-slate-400 leading-relaxed font-medium">{game.description}</p>
            </div>
            <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl">
              <h2 className="text-xl font-black text-white mb-4 uppercase tracking-wider">Controls</h2>
              <ul className="space-y-3 text-slate-400 font-medium">
                <li className="flex justify-between border-b border-slate-800 pb-2"><span>Move</span> <span className="text-indigo-400 font-black">WASD / Arrows</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-2"><span>Action</span> <span className="text-indigo-400 font-black">SPACE</span></li>
                <li className="flex justify-between"><span>Menu</span> <span className="text-indigo-400 font-black">ESC</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <aside className="w-full lg:w-96 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-3">
              <div className="w-2 h-7 bg-indigo-600 rounded-full" />
              Related
            </h2>
          </div>
          <div className="space-y-4">
            {games.filter(g => g.id !== id).slice(0, 6).map(g => (
              <Link key={g.id} to={`/game/${g.id}`} className="flex items-center gap-5 bg-slate-900/40 p-4 rounded-2xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all group">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden ring-1 ring-slate-800">
                  <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white truncate text-base group-hover:text-indigo-400 transition-colors">{g.title}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1 tracking-widest">{g.category}</p>
                </div>
              </Link>
            ))}
          </div>
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
      <div className="py-16 px-10 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full" />
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase">{name} Games</h1>
        <p className="text-slate-400 text-lg font-medium max-w-xl">Curated list of the highest quality unblocked {name?.toLowerCase()} titles available on Portal X.</p>
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
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-400">
        <Navbar onSearch={setSearch} />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-10 md:py-16">
          <Routes>
            <Route path="/" element={<Home searchQuery={search} />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/category/:name" element={<CategoryPage />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-900 bg-slate-950 py-16 px-6 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/20 shadow-xl shadow-indigo-600/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase">Portal X</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs font-medium">
                The next generation of unblocked gaming. High performance, zero lag, and no restrictions.
              </p>
            </div>
            
            <div className="flex gap-10 text-slate-400 text-sm font-black uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>

            <div className="text-slate-700 text-xs text-center md:text-right font-bold uppercase tracking-widest leading-loose">
              © 2024 Portal X Universe<br />
              Secure Unblocked Node
            </div>
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
