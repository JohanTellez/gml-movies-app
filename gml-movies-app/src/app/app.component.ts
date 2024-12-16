import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'gml-movies-app';

  constructor(
    private movieServices: MovieService
  ){}

  ngOnInit() {
    this.movieServices.apiConection().subscribe(
      response => console.log('Conexión exitosa: ', response),
      error => console.log('Error de conexión: ', error)
    )
  }
}
