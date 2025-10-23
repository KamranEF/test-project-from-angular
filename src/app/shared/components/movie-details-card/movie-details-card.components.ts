import { Component, OnInit } from '@angular/core';
import { MovieDetailsRoot } from '../../../core/services/types/movie-details.type';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-movie-details-card',
  standalone: true,
  templateUrl: './movie-details-card.components.html',
  styleUrl: './movie-details-card.components.less',
})
export class MovieDetailsCard implements OnInit {
  movieDetails: MovieDetailsRoot | null = null;

  constructor(private modal: NzModalRef) {
    this.movieDetails = this.modal.getConfig().nzData.movie;
  }

  ngOnInit() {
    console.log(this.movieDetails);
  }
}
