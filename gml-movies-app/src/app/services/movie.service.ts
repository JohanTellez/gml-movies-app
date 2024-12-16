import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Buscar peliculas por título
   * @param query lleva el nombre de la pelícua
   * @param page lleva el número de página
   * @returns 
   */
  searchMovies(query: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', query)
      .set('page', page.toString());

    return this.http.get(`${this.apiUrl}/search/movie`, { params });
  }

  /**
   * Obtner detalles de la pelicula por id
   * @param id id de la pelicula
   * @returns 
   */
  getMovieDetails(id: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.apiUrl}/movie/${id}`, { params });
  }

  /**
   * Trae las películas populares
   * @param page lleva el número de la página
   * @returns 
   */
  getPopularMovies(page: number): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  apiConection() {
    return this.http.get(`${this.apiUrl}/movie/popular`, {
      params: { api_key: this.apiKey }
    });
  }
  
}
