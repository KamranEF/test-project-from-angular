export interface MovieRoot {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
}

export interface OriginalMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieType = OriginalMovie & {
  voteAverage: OriginalMovie['vote_average'];
  releaseDate: OriginalMovie['release_date'];
  posterPath: OriginalMovie['poster_path'];
  genres: string[];
};

export type UsedMovieUnionType =
  | 'id'
  | 'title'
  | 'genres'
  | 'posterPath'
  | 'voteAverage'
  | 'releaseDate';
