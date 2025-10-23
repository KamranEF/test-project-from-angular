import { Component, Input } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagComponent } from 'ng-zorro-antd/tag';

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
  @Input() viewMovieDetails!: (id: number | null) => void;
}
