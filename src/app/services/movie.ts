import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Marks the class as injectable so it can be accessed app-wide
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  
  // HttpClient injected here, allows the service to make web reqests to TMDB
  constructor(private http: HttpClient) {}

  // Builds the movie list from the trending page on TMDB.
  // Request url built by inserting the API key from environment.
  getTrending() {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=${environment.tmdbApiKey}';
    return this.http.get(url);
  }

}
