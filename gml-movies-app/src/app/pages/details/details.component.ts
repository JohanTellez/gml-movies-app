import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-details',
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {

  movieId: number = 0;
  movie: any = {};
  imageBaseUrl: string = environment.imagesUrl;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.movieId = id ? +id : 0;
      this.getMovieDetails();
    });
  }

  getMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe(response => {
      this.movie = response;
    });
  }

}
