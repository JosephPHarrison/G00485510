import { Component, OnInit } from '@angular/core';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonButton, IonHeader } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { Movie } from '../models/movie.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonButton, FormsModule, NavbarComponent, IonHeader],
})
export class HomePage implements OnInit {
  
  // Holds the lsit of movies in an array, starts empty, filled on response
  movies: Movie[] = [];

  // The text the user has typed into the search box
  searchTerm: string = '';

  // The heading seen above the list of movies. Changes between trendign and search.
  heading: string = "Today's Trending Movies";

  // ApiService injected so the page can request data, Router navigates to other pages
  constructor(private apiService: ApiService, private router: Router) {
  }

  // Runs automatically when the page loads. Fetches initial data.
  ngOnInit() {
    this.loadTrending();
  }

  // Retrieves the trending movies and stores the data once returned.
  loadTrending() {
    this.heading = "Today's Trending Movies";
    this.apiService.getTrending().subscribe((response: any) => {
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
      this.apiService.searchMovies(this.searchTerm).subscribe((response: any) => {
        this.movies = response.results;
      });
    }
  }

  // Navigates to the Movie Details page for the selected movie by passing its ID to the url
  openMovie(id: number) {
    this.router.navigate(['/movie-details', id]);
  }

}
