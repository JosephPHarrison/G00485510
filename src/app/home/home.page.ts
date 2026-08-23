import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonButton, FormsModule, IonButtons, IonIcon],
})
export class HomePage implements OnInit {
  
  // Holds the lsit of movies in an array, starts empty, filled on response
  movies: Movie[] = [];

  // The text the user has typed into the search box
  searchTerm: string = '';

  // The heading seen above the list of movies. Changes between trendign and search.
  heading: string = "Today's Trending Movies";

  // MovieService injected so the page can request data
  constructor(private movieService: MovieService, private router: Router) {
    addIcons({ heart });
  }

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

  // Navigates to the Movie Details page for the selected movie by passing its ID to the url
  openMovie(id: number) {
    this.router.navigate(['/movie-details', id]);
  }

  // Opens the favourites page
  openFavourites() {
    this.router.navigate(['/favourites']);
  }

}
