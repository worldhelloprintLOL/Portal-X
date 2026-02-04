
import { Game, Category } from '../types';

export const games: Game[] = [
  {
    id: 'space-invaders',
    title: 'Void Runner',
    description: 'Dodge asteroids and survive the deep space vacuum in this high-intensity arcade runner.',
    thumbnail: 'https://picsum.photos/id/10/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html', // Placeholder for game engine
    category: Category.Arcade,
    featured: true
  },
  {
    id: 'block-puzzle',
    title: 'Neon Blocks',
    description: 'A mind-bending puzzle game where you arrange geometric shapes to clear lines.',
    thumbnail: 'https://picsum.photos/id/20/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Puzzle
  },
  {
    id: 'pixel-quest',
    title: 'Pixel Quest',
    description: 'Embark on a nostalgic 8-bit adventure through dungeons and mystical forests.',
    thumbnail: 'https://picsum.photos/id/30/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Retro,
    featured: true
  },
  {
    id: 'fast-track',
    title: 'Fast Track 3D',
    description: 'Burn rubber and drift around corners in this ultra-fast street racing simulation.',
    thumbnail: 'https://picsum.photos/id/40/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Sports
  },
  {
    id: 'fort-defense',
    title: 'Fortress Defense',
    description: 'Tactical tower defense. Build, upgrade, and protect your kingdom from invaders.',
    thumbnail: 'https://picsum.photos/id/50/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Strategy
  },
  {
    id: 'cyber-clash',
    title: 'Cyber Clash',
    description: 'Fast-paced multiplayer action set in a neon-lit cyberpunk arena.',
    thumbnail: 'https://picsum.photos/id/60/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Action
  },
  {
    id: 'gravity-flip',
    title: 'Gravity Flip',
    description: 'Challenge physics in this platformer where gravity is just a suggestion.',
    thumbnail: 'https://picsum.photos/id/70/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Puzzle
  },
  {
    id: 'hoop-star',
    title: 'Hoop Star',
    description: 'Master the court and become the ultimate basketball legend.',
    thumbnail: 'https://picsum.photos/id/80/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Sports
  },
  {
    id: 'tank-wars',
    title: 'Steel Titans',
    description: 'Heavy metal combat. Control a fleet of tanks in explosive battlefields.',
    thumbnail: 'https://picsum.photos/id/90/800/600',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.Action
  }
];
