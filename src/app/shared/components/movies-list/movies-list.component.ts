import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card.component';
import { MovieType, UsedMovieUnionType } from '../../../core/services/types/movie.type';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.less',
  imports: [CommonModule, MovieCard],
})
export class MoviesList {
  @Input() movies: Pick<MovieType, UsedMovieUnionType>[] | null = null;
  @Input() emptyStateMessage = 'Ничего не найдено.';
}
