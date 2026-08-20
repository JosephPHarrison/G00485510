import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonButton, FormsModule],
})
export class HomePage implements OnInit {
  
  // Holds the lsit of movies in an array, starts empty, filled on response
  movies: Movie[] = [];

  // The text the user has typed into the search box
  searchTerm: string = '';

  // The heading seen above the list of movies. Changes between trendign and search.
  heading: string = "Today's Trending Movies";

  // MovieService injected so the page can request data
  constructor(private movieService: MovieService) {}

  // Runs automatically when the page loads. Fetches initial data.
  ngOnInit() {
    this.loadTrending();
  }

  // Retrieves the trending movies and stores the data once returned.
  loadTrending() {
    this.heading = "Today's Trending Movies";
    this.movieService.getTrending().subscribe((response: any) => {
      this.movies = response.results;
    });
  }

  // Decides what to show the user when the search function is used.
  // An empty box falls back to trending, while a term searches for a matching movie.
  search() {
    if (this.searchTerm.trim() === '') {
      this.loadTrending();
    } else {
      this.heading = this.searchTerm + ' Movies';
      this.movieService.searchMovies(this.searchTerm).subscribe((response: any) => {
        this.movies = response.results;
      });
    }
  }

}
