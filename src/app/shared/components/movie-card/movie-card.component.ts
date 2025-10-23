import { Component, inject, Input } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { MovieDetailsRoot } from '../../../core/services/types/movie-details.type';
import { MovieDetailsCard } from '../movie-details-card/movie-details-card.components';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MovieService } from '../../../core/services/service/movie.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.less',
  imports: [NzButtonComponent, NzIconModule, NzTagComponent],
})
export class MovieCard {
  @Input() id: number | null = null;
  @Input() title = '';
  @Input() genres: string[] = [];
  @Input() posterPath = '';
  @Input() voteAverage: number | null = null;
  @Input() releaseDate = '';
  private MovieService = inject(MovieService);
  private ModalService = inject(NzModalService);

  public viewMovieDetails(id: number | null) {
    this.MovieService.getMovieById(id)
      .pipe(
        catchError(() => {
          return of(null);
        }),
      )
      .subscribe((movieDetails) => {
        if (movieDetails) {
          this.openMovieDetailsModal(movieDetails);
        }
      });
  }

  public openMovieDetailsModal(movie: MovieDetailsRoot) {
    this.ModalService.create({
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
