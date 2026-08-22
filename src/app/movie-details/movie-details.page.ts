import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';
import { CastMember, CrewMember } from '../models/credits.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class MovieDetailsPage implements OnInit {

  // Holds the movie whose details are being shown, kept undefined until fetch is completed.
  movie: any;

  // The movie's cast, starts as empty, then taken from the credits
  cast: CastMember[] = [];

  // The movie's crew, starts as empty, then taken from teh credits
  crew: CrewMember[] = [];

  // ActivatedRoute reads the movie ID fro mthe URL, MovieServices fetches the data
  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {
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
      });
    }
  }

  // Navigates to the Person Details page for the selected cast or crew member
  openPerson(id: number) {
    this.router.navigate(['/person-details', id]);
  }

}
