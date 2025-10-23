import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  of,
  shareReplay,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GenreRoot } from '../types/genres.type';
import { MovieRoot } from '../types/movie.type';
import { MovieDetailsRoot } from '../types/movie-details.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private headers = {
    Authorization: `Bearer ${environment.token}`,
  };

  private searchQuerySubject = new BehaviorSubject('');

  public searchQuery$ = this.searchQuerySubject.asObservable();

  public searchResults$: Observable<MovieRoot | null>;
  public nowPlayingMovie$: Observable<MovieRoot | null>;
  public topRatedMovie$: Observable<MovieRoot | null>;
  public popularMovie$: Observable<MovieRoot | null>;

  public genres$: Observable<GenreRoot>;

  constructor(private http: HttpClient) {
    this.genres$ = this.getMovieGenres().pipe(shareReplay(1));

    this.searchResults$ = this.searchQuery$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query || query.trim().length === 0) {
          return of(null);
        }
        return this.getSearchMovie(query).pipe(
          catchError(() => {
            return of(null);
          }),
        );
      }),
    );

    this.nowPlayingMovie$ = this.getNowPlayingMovie();
    this.topRatedMovie$ = this.getTopRatedMovie();
    this.popularMovie$ = this.getPopularMovie();
  }

  updateSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  getCurrentQuery() {
    return this.searchQuerySubject.value;
  }

  private getSearchMovie(query: string) {
    const url = `${environment.apiUrl}/search/movie?query=${query}&include_adult=false&language=ru-RU&page=1`;
    return this.http.get<MovieRoot>(url, {
      headers: this.headers,
    });
  }

  public getPopularMovie() {
    const url = `${environment.apiUrl}/movie/popular?language=en-US&page=1`;
    return this.http.get<MovieRoot>(url, {
      headers: this.headers,
    });
  }

  public getTopRatedMovie() {
    const url = `${environment.apiUrl}/movie/top_rated?language=en-US&page=1`;
    return this.http.get<MovieRoot>(url, {
      headers: this.headers,
    });
  }

  public getNowPlayingMovie() {
    const url = `${environment.apiUrl}/movie/now_playing?language=en-US&page=1`;
    return this.http.get<MovieRoot>(url, {
      headers: this.headers,
    });
  }

  public getMovieGenres() {
    const url = `${environment.apiUrl}/genre/movie/list`;
    return this.http.get<GenreRoot>(url, {
      headers: this.headers,
    });
  }

  public getMovieById(id: number | null) {
    const url = `${environment.apiUrl}/movie/${id}`;
    return this.http.get<MovieDetailsRoot>(url, {
      headers: this.headers,
    });
  }
}
