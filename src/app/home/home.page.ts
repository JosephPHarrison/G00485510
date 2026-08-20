import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class HomePage implements OnInit {
  
  // Holds the lsit of movies in an array, starts empty, filled on response
  movies: Movie[] = [];

  // MovieService injected so the page can request data
  constructor(private movieService: MovieService) {}

  // Runs automatically when the page loads. Fetches initial data.
  ngOnInit() {
    this.loadTrending();
  }

  // Retrieves the trending movies and stores the data once returned.
  loadTrending() {
    this.movieService.getTrending().subscribe((response: any) => {
      this.movies = response.results;
    });
  }

}
