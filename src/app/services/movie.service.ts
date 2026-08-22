import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Marks the class as injectable so it can be accessed app-wide
@Injectable({
  providedIn: 'root',
})
export class MovieService {

  // HttpClient injected here, allows the service to make web reqests to TMDB
  constructor(private http: HttpClient) { }

  // Builds the movie list from the trending page on TMDB.
  // Request url built by inserting the API key from environment.
  getTrending() {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${environment.tmdbApiKey}`;
    return this.http.get(url);
  }

  // Searches TMDB for content matching the user's input. encodeURIComponent makes the text URL safe.
  searchMovies(term: string) {
    const query = encodeURIComponent(term);
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${environment.tmdbApiKey}`;
    return this.http.get(url);
  }

  // Fetches the details for a singel movie, including the overview, title, cast, and crew.
  // append_to_response bundles the credits into the same request to avoid the need for a second call.
  // Adapted from TMDB, 2026 (https://developer.themoviedb.org/docs/append-to-response).
  getMovieDetails(id: string) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${environment.tmdbApiKey}&append_to_response=credits`;
    return this.http.get(url);
  }

  // Fetches the details for a person (cast or crew member), along with their movie credits.
  // append_to_response bundles their movies into the same request to avoid the need for a second call.
  // Adapted from TMDB, 2026 (https://developer.themoviedb.org/docs/append-to-response).
  getPersonDetails(id: string) {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${environment.tmdbApiKey}&append_to_response=movie_credits`;
    return this.http.get(url);
  }

}
