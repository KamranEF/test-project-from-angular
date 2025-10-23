import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, combineLatest, Observable, of, switchMap } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MoviesList } from '../components/movies-list/movies-list.component';
import { MovieService } from '../../core/services/service/movie.service';
import { MovieType, UsedMovieUnionType } from '../../core/services/types/movie.type';
import { Genre } from '../../core/services/types/genres.type';
import { MovieDetailsRoot } from '../../core/services/types/movie-details.type';
import { NzTabComponent, NzTabsComponent } from 'ng-zorro-antd/tabs';
import { TabIndex } from './types/tab.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MovieDetailsCard } from '../components/movie-details-card/movie-details-card.components';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
  standalone: true,
  imports: [CommonModule, MoviesList, NzTabsComponent, NzTabComponent],
  providers: [NzModalService],
})
export class Main {
  protected readonly TabIndex = TabIndex;
  searchMovies$: Observable<Pick<MovieType, UsedMovieUnionType>[] | null>;
  popularMovie$: Observable<Pick<MovieType, UsedMovieUnionType>[] | null>;
  topRateMovie$: Observable<Pick<MovieType, UsedMovieUnionType>[] | null>;
  nowPlaying$: Observable<Pick<MovieType, UsedMovieUnionType>[] | null>;
  movieDataById$: Observable<Partial<MovieDetailsRoot> | null>;
  movieIdSubject = new BehaviorSubject<number | null>(null);
  genres$: Observable<Genre[]>;
  selectedTabIndex = TabIndex.Popular;

  constructor(
    private movieService: MovieService,
    public modalService: NzModalService,
  ) {
    this.genres$ = this.movieService.genres$.pipe(map((genreResult) => genreResult.genres));

    this.searchMovies$ = combineLatest([this.movieService.searchResults$, this.genres$]).pipe(
      map(([searchResults, genres]) => {
        if (!searchResults?.results) {
          return null;
        }

        return searchResults.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            genres: this.transformGenreIdsToNames(movie.genre_ids || [], genres),
            posterPath: movie.poster_path,
            voteAverage: parseFloat(movie.vote_average.toFixed(1)),
            releaseDate: String(new Date(movie.release_date).getFullYear() || ''),
          };
        });
      }),
    );

    this.nowPlaying$ = combineLatest([this.movieService.nowPlayingMovie$, this.genres$]).pipe(
      map(([searchResults, genres]) => {
        if (!searchResults?.results) {
          return null;
        }

        return searchResults.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            genres: this.transformGenreIdsToNames(movie.genre_ids || [], genres),
            posterPath: movie.poster_path,
            voteAverage: parseFloat(movie.vote_average.toFixed(1)),
            releaseDate: String(new Date(movie.release_date).getFullYear() || ''),
          };
        });
      }),
    );

    this.popularMovie$ = combineLatest([this.movieService.popularMovie$, this.genres$]).pipe(
      map(([searchResults, genres]) => {
        if (!searchResults?.results) {
          return null;
        }

        return searchResults.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            genres: this.transformGenreIdsToNames(movie.genre_ids || [], genres),
            posterPath: movie.poster_path,
            voteAverage: parseFloat(movie.vote_average.toFixed(1)),
            releaseDate: String(new Date(movie.release_date).getFullYear() || ''),
          };
        });
      }),
    );

    this.topRateMovie$ = combineLatest([this.movieService.topRatedMovie$, this.genres$]).pipe(
      map(([searchResults, genres]) => {
        if (!searchResults?.results) {
          return null;
        }

        return searchResults.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            genres: this.transformGenreIdsToNames(movie.genre_ids || [], genres),
            posterPath: movie.poster_path,
            voteAverage: parseFloat(movie.vote_average.toFixed(1)),
            releaseDate: String(new Date(movie.release_date).getFullYear() || ''),
          };
        });
      }),
    );

    this.movieDataById$ = this.movieIdSubject.pipe(
      switchMap((id) => {
        if (!id) return of(null);
        return this.movieService.getMovieById(id).pipe(
          map((movie) => {
            return movie;
          }),
          catchError(() => of(null)),
        );
      }),
    );

    this.movieDataById$.pipe(filter((movie) => movie !== null)).subscribe((movie) => {
      this.openMovieDetailsModal(movie);
    });
  }

  private transformGenreIdsToNames(genreIds: number[], genres: Genre[]): string[] {
    return genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre?.name || '';
    });
  }

  viewMovieDetails = (id: number | null) => {
    this.movieIdSubject.next(id);
  };

  private openMovieDetailsModal(movie: Partial<MovieDetailsRoot>) {
    this.modalService.create({
      nzTitle: '',
      nzFooter: null,
      nzMask: false,
      nzClosable: true,
      nzMaskClosable: true,
      nzContent: MovieDetailsCard,
      nzClassName: 'movie-details-card',
      nzData: {
        movie: movie,
      },
    });
  }
}
