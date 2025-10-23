import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { MovieService } from '../../core/services/service/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzInputDirective, CommonModule],
})
export class Header {
  isAuthenticated = false;

  constructor(private movieService: MovieService) {}

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.movieService.updateSearchQuery(target.value);
  }

  clearSearch(): void {
    this.movieService.updateSearchQuery('');
  }
}
