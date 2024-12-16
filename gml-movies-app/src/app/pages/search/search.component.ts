import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent implements OnInit {
  query: string = '';
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pagesToShow: number[] = [];
  imageBaseUrl: string = environment.imagesUrl;

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.fetchMovies();
  }


  /**
   * Se obtienen las películas desde la api
   */
  fetchMovies() {
    if (this.query.trim()) {
      this.movieService.searchMovies(this.query, this.currentPage).subscribe(response => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
        this.updatePagination();
      });
    } else {
      this.movieService.getPopularMovies(this.currentPage).subscribe(response => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
        this.updatePagination();
      });
    }
  }


  /**
   * Función para realizar la búsqyueda de las películas 
   */
  onSearch() {
    this.currentPage = 1;
    this.fetchMovies();
  }


/**
 * Función para actualizar las páginas a mostrar en el paginador
 */
updatePagination() {
  const maxPagesToShow = 5;
  const pages: number[] = [];
  let startPage = this.currentPage - Math.floor(maxPagesToShow / 2);
  let endPage = this.currentPage + Math.floor(maxPagesToShow / 2);
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(maxPagesToShow, this.totalPages);
  }
  if (endPage > this.totalPages) {
    endPage = this.totalPages;
    startPage = Math.max(1, this.totalPages - maxPagesToShow + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  this.pagesToShow = pages;
}

  /**
   * Función para realizar la busqueda al cambiar de página
   * @param page lleva el número de la página
   */
  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchMovies();
  }

}
