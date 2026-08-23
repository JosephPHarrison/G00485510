import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CastMember, CrewMember } from '../models/credits.model';
import { FavouritesService } from '../services/favourites.service';

import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent,  CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, NavbarComponent]
})
export class MovieDetailsPage implements OnInit {

  // Holds the movie whose details are being shown, kept undefined until fetch is completed.
  movie: any;

  // The movie's cast, starts as empty, then taken from the credits
  cast: CastMember[] = [];

  // The movie's crew, starts as empty, then taken from teh credits
  crew: CrewMember[] = [];

  // Tracks whether the current movie is in the favourites list, controlling the button label
  isFavourited: boolean = false;

  // ActivatedRoute reads the movie ID fro mthe URL, MovieServices fetches the data, Router navigates to other pages, FavouriteServe manages the favourites list
  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router, private favouritesService: FavouritesService) {
  }

  ngOnInit() {

    // Reads the ID route parameter from teh URL
    const id = this.route.snapshot.paramMap.get('id');

    // If an ID is found, fetches the movie details including the cast and crew
    if (id) {
      this.movieService.getMovieDetails(id).subscribe((response: any) => {
        this.movie = response;
        this.cast = response.credits.cast;
        this.crew = response.credits.crew;
        this.checkFavourites();
      });
    }
  }

  // Navigates to the Person Details page for the selected cast or crew member
  openPerson(id: number) {
    this.router.navigate(['/person-details', id]);
  }

  // Checks thwther the current movie is already in the favourites list, updates the button state
  async checkFavourites() {
    this.isFavourited = await this.favouritesService.isFavourite(this.movie.id);
  }

  // Toggles the movie in or out of hte favourites lsit depending on its current state
  async toggleFavourite() {
    if (this.isFavourited) {
      await this.favouritesService.removeFavourite(this.movie.id);
    } else {
      await this.favouritesService.addFavourite(this.movie);
    }
    this.checkFavourites();
  }

}
