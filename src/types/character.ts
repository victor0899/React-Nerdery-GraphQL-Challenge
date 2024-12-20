//comment for review
export interface BaseEntity {
  id: string;
  created: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Episode extends BaseEntity {
  name: string;  
  episode: string; 
}


export interface Character extends BaseEntity {
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  episode: Episode[];
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}


export interface ApiResponse<T> {
  results: T[];
  info: PaginationInfo;
}

export type CharacterResponse = ApiResponse<Character>;