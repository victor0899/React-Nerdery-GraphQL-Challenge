export interface Episode {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
  }
  
  export interface ApiResponse<T> {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: T[];
  }
  
  export interface Season {
    number: number;
    episodes: Episode[];
  }