
export enum Category {
  Action = 'Action',
  Puzzle = 'Puzzle',
  Sports = 'Sports',
  Arcade = 'Arcade',
  Strategy = 'Strategy',
  Retro = 'Retro'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: Category;
  featured?: boolean;
}
